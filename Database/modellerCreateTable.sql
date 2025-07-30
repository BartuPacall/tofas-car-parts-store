CREATE TABLE modeller (
    model_id INT PRIMARY KEY,
    marka_id INT,
    model_adi VARCHAR(255) NOT NULL,
    FOREIGN KEY (marka_id) REFERENCES markalar(marka_id)
);
