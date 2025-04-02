// import React from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// import ProductList from "./components/ProductList";
// import Navbar from "./components/Navbar/Navbar";
// import Footer from "./components/Footer/Footer";

// const App = () => {
//   return (

//     <Router>
//     <Routes>
//         {/* หน้า Dashboard */}
//         <Route
//             path="/"
//             element={
//                 <Layout>
//                     <Navbar />
//                     <ProductList />
//                     <Footer />
//                 </Layout>
//             }
//         />
//         </Routes>
//         </Router>
//   );
// };

// export default App;





import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Components
// import Homepage from "./components/Homepage";
import ProductList from "./components/ProductList";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import ProductDetail from './components/ProductDetail'; // สร้างหน้า ProductDetail
import Categories from './components/Categories';

const App = () => {
    return (
        <Router>
            <Routes>

            {/* <Route
                    path="/"
                    element={
                        <>
                            <Navbar />
                            <Homepage />
                            <Footer />
                        </>
                    }
                /> */}


                {/* หน้า Dashboard */}
                <Route
                    path="/"
                    element={
                        <>
                            <Navbar />
                            <ProductList />
                            <Footer />
                        </>
                    }
                />
                
                <Route
                    path="/categories/:id"
                    element={
                        <>
                            <Navbar />
                            <Categories />
                            <Footer />
                        </>
                    }
                />

                
                <Route 
                    path="/product-detail/:id" 
                    element={
                      <>
                          <Navbar />
                          <ProductDetail />
                          <Footer />
                      </> 
                        }
                      />

            </Routes>
        </Router>
    );
};

export default App;
