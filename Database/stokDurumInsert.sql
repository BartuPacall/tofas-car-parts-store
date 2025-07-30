insert into stok_durum (stok_id,miktar)
select
generate_series(1, 140) as stok_id,
floor(random()* 101 )::int as miktar;


update yedek_parcalar yp
set stok_id = yp.yedek_id ;
select * from stok_durum sd ;