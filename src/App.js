// ** Imports stuff
import { Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { useSelector } from "react-redux";

// ** Styles stuff
import { createGlobalStyle } from "styled-components";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./Themes";

// ** Pages stuff
import HomePage from "./pages";
import PersonsPage from "./pages/PersonPage";
import AddPersonPage from "./pages/AddPersonPage";
import TestPages from "./pages/TestPages";

// ** Components stuff
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import NewTestPage from "pages/NewTestPage";
import UpdatePersonPage from "pages/UpdatePersonPage";
import Login from "pages/Login";

const App = () => {
  const queryClient = new QueryClient();
  const { isDarkMode } = useSelector(({ ui }) => ui);

  // ** Global styles
  const GlobalStyles = createGlobalStyle`
	body {
		background: ${isDarkMode ? "#fff" : "#18191a"};
		color: ${!isDarkMode ? "#fff" : "#000"};
		.css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root,
		.css-1kty9di-MuiFormLabel-root-MuiInputLabel-root
		 {
			color: ${!isDarkMode ? "#fff" : "#000"};
		}

	.css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root,
	 .css-1kty9di-MuiFormLabel-root-MuiInputLabel-root {
			background-color: ${!isDarkMode ? "#18191a" : "#fff"}; 
			padding: 0 12px;
		};
		
	.add-person-form svg {
		 color:
				 ${!isDarkMode ? "#fff !important" : "#18191 !important"};
	 }
			
		input, textarea, select, .css-1nrlq1o-MuiFormControl-root {
			border: ${isDarkMode ? "1px solid #cbcbcb !important" : "1px solid #838383 !important"};
			outline: none !important;

		 
			color: ${isDarkMode ? "#000" : "#fff !important"}
		}
		.ant-modal-body input {
			color: #000 !important
			
		}
		.ant-table {
			background-color: ${!isDarkMode ? "#333" : "#fff"}; 
			color: ${!isDarkMode ? "#fff" : "#333"}; 
		}
	}
	`;
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={isDarkMode ? lightTheme : darkTheme}>
        <GlobalStyles />
        <div className="App app-container app-wrapper testing-class">
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route exact path="/persons" element={<PersonsPage />} />
            <Route exact path="/add-person" element={<AddPersonPage />} />
            <Route exact path="/persons/:id/edit" element={<UpdatePersonPage />} />
            {/* TODO remove line above in production */}
            <Route path="/test" element={<TestPages />} />
            <Route path="/newtest" element={<NewTestPage />} />
            <Route path="/Login" element={<Login />} />
          </Routes>
        </div>

        <Footer />
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
