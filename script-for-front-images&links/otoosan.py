import time
import os
import requests
import pandas as pd
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager

# CSV ve görsel için klasör
os.makedirs("urun_resimleri", exist_ok=True)

# WebDriver başlat
driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))
driver.get("https://otoparcasan.com/oto-yedek-parca/fiat_egea_egea-357-hb-cross-2016")
time.sleep(5)  # Sayfanın yüklenmesini bekle

# Ürünleri bul
products = driver.find_elements(By.CLASS_NAME, "product-item-content")

# Veri listesi
product_list = []

for product in products:
    try:
        # Ürün adı ve    link
        name_tag = product.find_element(By.CSS_SELECTOR, ".product-name a")
        name = name_tag.text.strip()
        link = name_tag.get_attribute("href")

        # Fiyat
        try:
            price = product.find_element(By.CLASS_NAME, "product-price").text.strip()
        except:
            price = "Belirtilmemiş"

        # Stok kodu
        try:
            stock_code = product.find_element(By.XPATH, ".//div[contains(text(), 'Stok Kodu')]/following-sibling::text()").text.strip()
        except:
            try:
                stock_code = product.find_element(By.XPATH, ".//div[@class='product-info'][1]").text.replace("Stok Kodu", "").strip()
            except:
                stock_code = "Yok"

        # Araç bilgisi
        try:
            vehicle_info = product.find_element(By.CLASS_NAME, "car-info").text.strip()
        except:
            vehicle_info = "Yok"

                # Sayfanın en altına scroll et ki tüm resimler yüklensin
        driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
        time.sleep(2)


            # Lazy load desteği ile görsel alma ve indirme
        img_tag = product.find_element(By.CSS_SELECTOR, ".product-img img")
        img_url = img_tag.get_attribute("data-src") or img_tag.get_attribute("src")

        # Görsel indir
        img_filename = img_url.split("/")[-1].split("?")[0]
        img_path = os.path.join("urun_resimleri", img_filename)
        try:
            img_data = requests.get(img_url).content
            with open(img_path, "wb") as f:
                f.write(img_data)
        except Exception as e:
            print(f"Görsel indirilemedi: {img_url}\n{e}")


        # CSV'ye eklenecek veri
        product_list.append({
            "Ürün Adı": name,
            "Ürün Linki": link,
            "Fiyat": price,
            "Stok Kodu": stock_code,
            "Araç Bilgisi": vehicle_info,
            "Resim URL": img_url,
            "Resim Dosyası": img_filename
        })

    except Exception as e:
        print("Bir ürün işlenirken hata:", e)

# WebDriver kapat
driver.quit()

# CSV yaz
df = pd.DataFrame(product_list)
df.to_csv("fiat_egea_egea-357-hb-cross-2016.csv", index=False, encoding="utf-8-sig")

print("İşlem tamamlandı. CSV oluşturuldu ve görseller indirildi.")
