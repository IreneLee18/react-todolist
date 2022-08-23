import { useState, useEffect } from "react";
import Header from "./Components/Header";
import AddContent from "./Components/AddContent";
import Tab from "./Components/Tab";
import TodoItem from "./Components/TodoItem";

function App() {
  const [newTodo, setNewTodo] = useState("");
  const tab = [
    {
      id: "all",
      type: "全部",
    },
    {
      id: "undone",
      type: "待完成",
    },
    {
      id: "done",
      type: "已完成",
    },
  ];
  const [currentTab, setCurrentTab] = useState("all");
  const [todoItem, setTodoItem] = useState([
    {
      id: Math.random(),
      todo: "起床",
      isDone: true,
    },
    {
      id: Math.random(),
      todo: "吃飯",
      isDone: false,
    },
    {
      id: Math.random(),
      todo: "洗澡",
      isDone: false,
    },
    {
      id: Math.random(),
      todo: "睡覺",
      done: false,
    },
  ]);
  const [currentTodoItem, setCurrentTodoItem] = useState(todoItem);
  const undone = todoItem.filter((item) => !item.isDone);
  const undoneLeg = undone.length;
  // function
  const addTodo = () => {
    if (newTodo !== "") {
      setTodoItem((state) => [
        ...state,
        {
          id: Math.random(),
          todo: newTodo,
          isDone: false,
        },
      ]);
      setCurrentTodoItem(todoItem);
      setNewTodo("");
    }
  };
  // 1.監聽currentTab，當切換tab就執行 2.監聽todoItem，當切換check就執行
  useEffect(() => {
    switch (currentTab) {
      case "all":
        setCurrentTodoItem(todoItem);
        break;
      case "undone":
        setCurrentTodoItem(todoItem.filter((item) => !item.isDone));
        break;
      case "done":
        setCurrentTodoItem(todoItem.filter((item) => item.isDone));
        break;
      default:
        break;
    }
  }, [currentTab, todoItem]);
  const done = (e) => {
    // 要取得的事checked的值，才能將checked值放到done上（原因：checked是負責切換checkbox的）
    const { id, checked } = e.target;
    return setTodoItem(
      todoItem.map((item) =>
        item.id === Number(id) ? { ...item, isDone: checked } : item
      )
    );
  };
  const clean = (e) => {
    setTodoItem(todoItem.filter((item) => item.id !== Number(e.target.id)));
  };
  const cleanAll = () => {
    setTodoItem(todoItem.filter((item) => !item.isDone));
    setCurrentTab("all");
  };
  return (
    <>
      <Header />
      <main>
        <AddContent
          newTodo={newTodo}
          setNewTodo={setNewTodo}
          addTodo={addTodo}
        />
        {todoItem.length > 0 ? (
          <div className="content">
            <ul className="tab">
              <Tab
                tab={tab}
                setCurrentTab={setCurrentTab}
                currentTab={currentTab}
              />
            </ul>
            <ul className="todolist">
              <TodoItem
                currentTodoItem={currentTodoItem}
                done={done}
                clean={clean}
              />
            </ul>
            <div className="bottom">
              <span>{undoneLeg} 個待完成項目</span>
              <button onClick={cleanAll}>清除已完成項目</button>
            </div>
          </div>
        ) : (
          <div className="empty">
            <div>
              <h2>目前無待辦事項 !</h2>
            </div>
          </div>
        )}
      </main>
    </>
  );
}

export default App;
