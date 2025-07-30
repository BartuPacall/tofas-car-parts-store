CREATE TABLE yedek_parcalar (
    yedek_id INT PRIMARY KEY,
    model_id INT,
    parca_adi VARCHAR(255) NOT NULL,
    aciklama TEXT NOT NULL,
    fiyat DECIMAL(10, 2) NOT NULL,
    stok_id INT,
    FOREIGN KEY (model_id) REFERENCES modeller(model_id),
    FOREIGN KEY (stok_id) REFERENCES stok_durum(stok_id)
);
