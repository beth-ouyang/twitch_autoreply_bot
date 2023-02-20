# -*- coding: UTF-8 -*-

import requests
from bs4 import BeautifulSoup
import re

# from selenium import webdriver  #從library中引入webdriver

# from selenium.webdriver.chrome.options import Options
# from selenium.webdriver.support.ui import Select

def MC_crawler(link):
    requ = requests.get(link)
    soup = BeautifulSoup(requ.text, 'html.parser')
    set_list = []

    topic_block = soup.find_all('span', class_='mcd-category-page__item-name')
    for i in topic_block:
        if requ.status_code == 200:
            item_name = i.text
            set_list.append(item_name)
        else:
            continue
    return set_list


def drink_crawler(store, link):
    requ = requests.get(link)
    soup = BeautifulSoup(requ.text, 'html.parser')
    set_list = []

    if (store == "50嵐")|(store == "清心福全"):
        topic_block = soup.find_all('p', style='width:35%')
        for i in topic_block:
            if requ.status_code == 200:
                item_name = store + ' ' + i.text
                set_list.append(item_name)
            else:
                continue

    if (store == "可不可"):
        topic_block = soup.find_all('p', class_='menu-item__name')
        for i in topic_block:
            if requ.status_code == 200:
                item_name = store + ' ' + re.sub('\s+','', i.text)
                set_list.append(item_name)
            else:
                continue

    if (store == "鶴茶樓"):
        topic_block = soup.find_all('label', class_='product_name_item')
        for i in topic_block:
            if requ.status_code == 200:
                item_name = store + ' ' + i.text
                set_list.append(item_name)
            else:
                continue

    if (store == "迷客夏"):
        topic_block = soup.find_all('li', class_='col-6')
        for i in topic_block:
            if requ.status_code == 200:
                item_name = store + ' ' + re.sub('\s+','', i.find('a').text)
                set_list.append(item_name)
            else:
                continue

    if (store == "五桐號"):
        topic_block = soup.find_all('td', style='width: 60%; border-style: solid; border-color: #000000; text-align: justify; height: 10px;')
        for i in topic_block:
            if requ.status_code == 200:
                item_name = store + ' ' + re.sub('\s+','', i.find('span').text)
                set_list.append(item_name)
            else:
                continue

    # if (store == "麻古"):
    #     topic_block = soup.find_all('h2', class_='title')
    #     for i in topic_block:
    #         if requ.status_code == 200:
    #             item_name = store + ' ' + i.text
    #             set_list.append(item_name)
    #         else:
    #             continue

    return set_list


def save_to_txt(path,list):
    f = open(path, "w")
    for item in list:
        f.write(item + '\n')
    
    f.close()

target_store = [
    ["mcdonald","https://www.mcdonalds.com/tw/zh-tw/full-menu/extra-value-meals.html"],
    ["50嵐","https://twcoupon.com/bmenu-50%E5%B5%90-menu%E8%8F%9C%E5%96%AE%E5%83%B9%E6%A0%BC.html"],
    ["可不可","https://www.kebuke.com/menu/"],
    ["鶴茶樓","https://menupapa.com/menu/3793"],
    ["迷客夏","https://www.milkshoptea.com/products.php"],
    # "麻古":"https://www.maculife.com.tw/product_list.asp?pg=1",
    ["五桐號", "https://savingmagazines.com/2022/01/12/wootea-3/"],
    ["清心福全", "https://twcoupon.com/bmenu-%E6%B8%85%E5%BF%83%E7%A6%8F%E5%85%A8-menu%E8%8F%9C%E5%96%AE%E5%83%B9%E6%A0%BC.html"]
]

def main_drink():
    drinks_list = []
    for element in target_store:
        drinks_list += drink_crawler(element[0], element[1])
    save_to_txt('./FoodListFolder/drink_list.txt', drinks_list)

def main_MC():
    save_to_txt('./FoodListFolder/mc_set_list.txt', MC_crawler(target_store[0][1]))


main_drink()
# main_MC()
