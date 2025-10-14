-- SQL query to verify foreign key relationships
SELECT 
    tc.table_name, 
    kcu.column_name, 
    ccu.table_name AS foreign_table, 
    ccu.column_name AS foreign_column 
FROM information_schema.table_constraints AS tc 
    JOIN information_schema.key_column_usage AS kcu ON tc.constraint_name = kcu.constraint_name 
    JOIN information_schema.constraint_column_usage AS ccu ON ccu.constraint_name = tc.constraint_name 
WHERE constraint_type = 'FOREIGN KEY'
ORDER BY tc.table_name, kcu.column_name;