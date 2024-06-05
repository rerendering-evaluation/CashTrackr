import { useCallback } from "react";
import { memo } from "react";
import { useState } from "react";
import ExpenseForm from "./components/ExpenseForm/ExpenseForm";
import ExpenseInfo from "./components/ExpenseInfo/ExpenseInfo";
import ExpenseList from "./components/ExpenseList/ExpenseList";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
const App = memo(function App() {
  const [expenses, setExpenses] = useState([]);
  const [expenseToUpdate, setExpenseToUpdate] = useState(null);
  const addExpense = useCallback(expense => {
    setExpenses(prevState => [expense, ...prevState]);
  }, [setExpenses]);
  const deleteExpense = useCallback(id => {
    setExpenses(prevExpenses => {
      return prevExpenses.filter(expense => expense.id !== id);
    });
  }, [setExpenses]);
  const resetExpenseToUpdate = useCallback(() => {
    setExpenseToUpdate(null);
  }, [setExpenseToUpdate]);
  const updateExpense = useCallback(expense => {
    const expensePos = expenses.map(function (exp) {
      return exp.id;
    }).indexOf(expense.id);
    if (expensePos === -1) {
      toast.error("Expense not found!");
      return false;
    }
    const expensesDuplicate = expenses;
    expensesDuplicate[expensePos] = expense;
    setExpenses(expensesDuplicate);
    return true;
  }, [expenses, setExpenses]);
  return <>
      <ToastContainer />
      <h2 className="mainHeading">Expense Tracker</h2>
      <div className="App">
        <ExpenseForm addExpense={addExpense} expenseToUpdate={expenseToUpdate} updateExpense={updateExpense} resetExpenseToUpdate={resetExpenseToUpdate} />
        <div className="expenseContainer">
          <ExpenseInfo expenses={expenses} />
          <ExpenseList expenses={expenses} deleteExpense={deleteExpense} changeExpenseToUpdate={setExpenseToUpdate} />
        </div>
      </div>
    </>;
});
export default App;