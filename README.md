# Scraper
This simple TypeScript app scrapes the chosen URLs at the intervals specified by the user and saves the `.html` files to disk. You can run this script locally with `ts-node app.ts`. 

## Configuration
1. Set the `URLS` environmental variable to be what you want to scrape. It should be in this format of (but ideally minified):
  ```json
  [
      {
          "name": "Google",
          "url": "https://www.google.com"
      }, {
          "name": "Bing",
          "url": "https://www.bing.com"
      }
  ]
  ```
2. Optionally set the `SAVE_DIRECTORY` environmental variable to be where you want to save the output. If you don't specify this, a default value will be used.
3. To specify the scrape frequency, modify `crontab.txt`. I recommend using a tool like [crontab guru](https://www.crontab.guru).

## Building the image
```
docker build -t IMAGE_NAME:TAG .
docker build -t scraper:1 .
```

## Running the image
```bash
docker run \
    -v LOCAL_DIRECTORY:/data \
    -e SAVE_DIRECTORY=/data \
    -e URLS=[...] \
    IMAGE

docker run \
    -v /Users/kevin/Desktop/saved_htmls:/data \
    -e SAVE_DIRECTORY=/data \
    -e URLS='[{"name":"Google","url":"https://www.google.com"},{"name":"Bing","url":"https://www.bing.com"}]' \
    scraper:1
```