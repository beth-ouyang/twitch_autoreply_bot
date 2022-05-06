from termios import FF1
import time
import pandas as pd
import requests
from bs4 import BeautifulSoup
import re

# from selenium import webdriver  #從library中引入webdriver

# from selenium.webdriver.chrome.options import Options
# from selenium.webdriver.support.ui import Select

def article_links_crawler(link):
    requ = requests.get(link)
    soup = BeautifulSoup(requ.text, 'html.parser')

    topic_block = soup.find_all('span', class_='mcd-category-page__item-name')
    set_list = []

    for i in topic_block:
        try:
            item_name = i.text
            set_list.append(item_name)
        except:
            continue

    return set_list

def save_to_txt(path,list):
    f = open(path, "w")
    for set in list:
        f.write(set + '\n')
    f.close()


save_to_txt('/Users/ouyangbeisi/Desktop/twitch_ppshrimp_bot/mc_set_list.txt', article_links_crawler('https://www.mcdonalds.com/tw/zh-tw/full-menu/extra-value-meals.html'))
