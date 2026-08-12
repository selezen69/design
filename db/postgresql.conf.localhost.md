# Ограничение PostgreSQL только localhost

Файл конфигурации: `C:\Program Files\PostgreSQL\17\data\postgresql.conf`

Сейчас (проверено, не изменено):

```
listen_addresses = '*'
```

Нужно изменить на:

```
listen_addresses = 'localhost'
```

`pg_hba.conf` менять не нужно — там уже разрешены только подключения
с `127.0.0.1/32` и `::1/128`, это правильно.

## Как применить (не выполнено, только план)

1. Открыть `C:\Program Files\PostgreSQL\17\data\postgresql.conf` с правами
   администратора и заменить строку `listen_addresses = '*'` на
   `listen_addresses = 'localhost'`.
2. Перезапустить службу Windows, чтобы изменение подхватилось:

   ```
   powershell -Command "Restart-Service postgresql-x64-17"
   ```

3. Проверить, что сервер теперь слушает только loopback:

   ```
   powershell -Command "Get-NetTCPConnection -LocalPort 5432 -State Listen"
   ```

   Ожидается только `127.0.0.1` и `[::1]` вместо `0.0.0.0` и `::`.
