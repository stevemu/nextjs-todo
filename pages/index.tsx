import type { NextPage } from 'next';
import { useQuery, useMutation } from 'react-query';
import { useForm } from 'react-hook-form';
import { Todo } from '../types/Todo';

const Home: NextPage = () => {
  const { data: todos = [], refetch } = useQuery<Todo[]>('todos', async () => {
    return (await fetch('/api/todo')).json();
  });
  const { register, handleSubmit } = useForm<Todo>();

  const mutation = useMutation(async (newTodo) => {
    await fetch('/api/todo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTodo),
    });
  });

  const onSubmit = async (todo) => {
    await mutation.mutateAsync(todo);
    await refetch();
  };

  return (
    <div>
      <div>todos</div>
      <ul>
        {todos.map((todo) => {
          return <li key={todo.text}>{todo.text}</li>;
        })}
      </ul>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input defaultValue='test' {...register('text')} />
        <input type='submit' />
      </form>
    </div>
  );
};

export default Home;
