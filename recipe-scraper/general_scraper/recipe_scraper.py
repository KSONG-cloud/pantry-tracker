import json
import os
import time
import random
from bs4 import BeautifulSoup
import requests


def load_config(config_path):
    with open(config_path, 'r') as f:
        return json.load(f)
    

def load_urls(url_file):
    with open(url_file, 'r') as f:
        return [line.strip() for line in f if line.strip()]
    

def save_to_jsonl(filename, data):
    with open(filename, 'a', encoding='utf-8') as f:
        f.write(json.dumps(data, ensure_ascii=False) + '\n')




def parse_recipe_metadata(soup):
    """
    Extracts recipe metadata like times and servings from a given BeautifulSoup object.

    Args:
        soup (BeautifulSoup): The parsed HTML soup of the recipe page.

    Returns:
        dict: A dictionary with keys like 'Prep Time', 'Cook Time', 'Total Time', 'Servings', etc.
    """
    metadata = {}
    detail_items = soup.select('.mm-recipes-details__item')

    for item in detail_items:
        label_el = item.select_one('.mm-recipes-details__label')
        value_el = item.select_one('.mm-recipes-details__value')

        if label_el and value_el:
            label = label_el.get_text(strip=True).rstrip(':')
            value = value_el.get_text(strip=True)
            metadata[label] = value

    return metadata



def scrape_recipe(url, selectors):
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 " +
                    "(KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36",
        "Accept-Language": "en-US,en;q=0.9",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Referer": "https://www.google.com",
        "Connection": "keep-alive",
    }

    session = requests.Session()
    session.headers.update(headers)

    response = session.get(url)

    # response = requests.get(url)
    print(response)
    if response.status_code != 200:
        print(f"Failed to fetch: {url}")
        return None
    
    soup = BeautifulSoup(response.text, 'lxml')


    metadata = parse_recipe_metadata(soup)


    def extract_all(selector):
        if not selector.strip():
            return []
        print(soup.select(selector))
        return [el.get_text(strip=True) for el in soup.select(selector)]
    
    def extract_one(selector):
        if not selector.strip():
            return []
        el = soup.select_one(selector)
        return el.get_text(strip=True) if el else None
    
    def extract_ingredients(selector):
        items = []
        for li in soup.select(selectors["ingredients_pack"]):
            quantity = li.select_one(selectors.get("ingredient_quantity", ""))
            unit = li.select_one(selectors.get("ingredient_unit", ""))
            name = li.select_one(selectors.get("ingredient_name", ""))
            
            items.append({
                "quantity": quantity.get_text(strip=True) if quantity else "",
                "unit": unit.get_text(strip=True) if unit else "",
                "name": name.get_text(strip=True) if name else ""
            })
        return items


    recipe = {
        "url": url,
        "title": extract_all(selectors.get("title", "")),
        "ingredients": extract_ingredients(selectors.get("ingredients", "")),
        "servings": metadata.get("Servings"),
        "prep_time": metadata.get("Prep Time"),
        "cook_time": extract_one(selectors.get("cook_time", "")),
        "total_time": metadata.get("Total Time")
    }

    return recipe



def sleep_between_requests(mean_delay=3, min_delay=1, max_delay=5):
    delay = min(max(random.expovariate(1 / mean_delay), min_delay), max_delay)
    print(f"⏳ Sleeping {delay:.2f}s...\n")
    time.sleep(delay)



def scrape_site(config_path, url_file, output_file, resume_from=0):
    config = load_config(config_path)
    urls = load_urls(url_file)
    total = len(urls)

    print(f"Starting scrape for {config['site_name']} ({total} URLs)")

    for i, url in enumerate(urls[resume_from:], start=resume_from):
        print(f"[{i+1}/{total}] Scraping: {url}")
        recipe = scrape_recipe(url, config['selectors'])


        if recipe:
            save_to_jsonl(output_file, recipe)

        else:
            print("Skipped (no data)")

        # delay = min(max(random.expovariate(1 / mean_delay), min_delay), max_delay)
        # print(f"⏳ Sleeping {delay:.2f}s...\n")
        # time.sleep(delay)

        sleep_between_requests()


    print("Scraping complete!")

    return