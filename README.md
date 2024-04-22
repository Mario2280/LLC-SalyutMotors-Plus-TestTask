# Тестовое задание

В БД имеется информация о 5000 покупателей. Разработчик добавил страницу со списком всех покупателей. Необходимо доделать этот список, добавив пагинацию - по 20 записей на страницу с разбивкой по 10 страниц.

![Результат](./result.png)



## Запуск проекта

Для соединения с Postgresql используется переменная окружения `APP_PG_URL` 
(например: `postgresql://user:password@localhost:5432/test_pagination?sslmode=disable`). 

Для загрузки данных в БД используйте файл `test_pagination_localhost-dump.sql` (например: `psql -h localhost -U user -d test_pagination -f test_pagination_localhost-dump.sql`).


"QUERY PLAN"
"Limit  (cost=113.22..113.68 rows=20 width=73) (actual time=0.325..0.328 rows=20 loops=1)"
"  ->  Seq Scan on users  (cost=0.00..116.00 rows=5000 width=73) (actual time=0.010..0.242 rows=4900 loops=1)"
"Planning Time: 0.059 ms"
"Execution Time: 0.336 ms"


"QUERY PLAN"
"Limit  (cost=0.28..2.13 rows=20 width=73) (actual time=0.067..0.074 rows=20 loops=1)"
"  ->  Index Scan using pk_users_id on users  (cost=0.28..11.38 rows=120 width=73) (actual time=0.066..0.071 rows=20 loops=1)"
"        Index Cond: (id > 4880)"
"Planning Time: 0.143 ms"
"Execution Time: 0.099 ms"

