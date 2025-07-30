CREATE TABLE sepet (
    sepet_id INT PRIMARY KEY,
    yedek_id INT,
    kullanici_id INT,
    miktar INT NOT NULL,
    olusturma_tarihi TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    stok_id INT,
    FOREIGN KEY (yedek_id) REFERENCES yedek_parcalar(yedek_id),
    FOREIGN KEY (kullanici_id) REFERENCES kullanicilar(kullanici_id),
    FOREIGN KEY (stok_id) REFERENCES stok_durum(stok_id)
);
