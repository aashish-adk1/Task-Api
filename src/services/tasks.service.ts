import {pool} from "../config/db.js";

export const getAllTasksService = async () => {
  const query = `
    SELECT *
    FROM tasks
    ORDER BY id ASC;
  `;

  const result = await pool.query(query);
  return result.rows;
};

export const getTaskByIdService = async (id: number) => {
  const query = `
    SELECT *
    FROM tasks
    WHERE id = $1;
  `;

  const result = await pool.query(query, [id]);
  return result.rows[0];
};

export const createTaskService = async (
  title: string,
  description?: string,
  completed?: boolean
) => {
  const query = `
    INSERT INTO tasks (title, description, completed)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;

  const values = [
    title,
    description ?? null,
    completed ?? false,
  ];

  const result = await pool.query(query, values);
  return result.rows[0];
};

export const updateTaskService = async (
  id: number,
  title?: string,
  description?: string,
  completed?: boolean
) => {
  const query = `
    UPDATE tasks
    SET
      title = COALESCE($1, title),
      description = COALESCE($2, description),
      completed = COALESCE($3, completed),
      updated_at = CURRENT_TIMESTAMP
    WHERE id = $4
    RETURNING *;
  `;

  const values = [
    title ?? null,
    description ?? null,
    completed ?? null,
    id,
  ];

  const result = await pool.query(query, values);
  return result.rows[0];
};

export const deleteTaskService = async (id: number) => {
  const query = `
    DELETE FROM tasks
    WHERE id = $1
    RETURNING *;
  `;

  const result = await pool.query(query, [id]);
  return result.rows[0];
};