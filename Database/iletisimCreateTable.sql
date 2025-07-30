CREATE TABLE iletisim (
    iletisim_id INT PRIMARY KEY,
    kullanici_id INT,
    mesaj TEXT NOT NULL,
    olusturma_tarihi TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    e_posta VARCHAR(255),
    FOREIGN KEY (kullanici_id) REFERENCES kullanicilar(kullanici_id)
);
