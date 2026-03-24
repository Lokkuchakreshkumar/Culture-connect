# Database Dump

## Table: users

| id | username | password |
| --- | --- | --- |
| 1 | testuser | $2b$10$.TPjp1hFl4oh6gj3ey8/TuRmD7LMBNq/EsqOA.ObPdKgpYXIztzQq |
| 3 | new | $2b$10$ZVmfim774VfDEHm02Qzpu.MxMNmEYuhwKhsqZ1g3EN5EXT3Xyu6mq |
| 4 | Yaswanth | $2b$10$TZxKF.P5akuCH.FcNk63NusKIMnaTaSfs2bPr1gEBbHj1CTUr/oBC |

## Table: posts

| id | user_id | username | image_url | description | tag | created_at |
| --- | --- | --- | --- | --- | --- | --- |
| 3 | 3 | new | /uploads/1772213619829.png | Cool | Vibe | 2026-02-27 17:33:39 |
| 4 | 4 | Yaswanth | /uploads/1773202227960.webp | Hi!!! ,this is yaswanth speaking here! | Food | 2026-03-11 04:10:27 |

## Table: likes

| id | user_id | post_id |
| --- | --- | --- |
| 1 | 3 | 3 |
| 2 | 3 | 2 |
| 3 | 4 | 4 |
| 4 | 4 | 3 |
| 5 | 4 | 2 |

## Table: comments

| id | user_id | post_id | username | text | created_at |
| --- | --- | --- | --- | --- | --- |
| 2 | 3 | 2 | new | Nice intution | 2026-02-27 17:42:35 |
| 3 | 4 | 4 | Yaswanth | HI | 2026-03-11 04:10:38 |
| 4 | 4 | 2 | Yaswanth | Great | 2026-03-11 04:10:51 |

## Table: events

*(empty)*

