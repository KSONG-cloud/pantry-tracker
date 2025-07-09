from general_scraper.recipe_scraper import scrape_site

scrape_site(
    config_path='configs/allrecipes.json',
    url_file='urls/allrecipes_urls.txt',
    output_file='data/allrecipes_output.jsonl',
    resume_from=0
)