import useMemoryStateHook from "hooks/useMemoryStateHook";

const NewTestPage = () => {
  const [todos, setTodos] = useMemoryStateHook("todos", "My state");

  console.log(todos);
  return (
    <div>
      <button type="button" onClick={() => setTodos("MY NEW STATE !")}>
        CHANGE MY STATE
      </button>
    </div>
  );
};

export default NewTestPage;
