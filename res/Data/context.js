import React, { useState } from "react";
const DataStorageContext = React.createContext();

export default function DataStorageProvider({ children }) {
    const [isLogin, setIslogin] = useState("false");
    const [UserInformation, setUserInformation] = useState([])
    const [Cart, setCart] = useState([])
    const [Sum, setSum] = useState(0);
    const [orderScreen, setOrderScreen] = useState(true);
    const [Message, setMessage] = useState({
        show: false,
        title: 'تنبية',
        message: 'يرجى التسجيل قبل انشاء الطلب'
    }
    );


    const AddToCart = (item, Op, Qu) => {
        if (Op == "minus" && Qu == 1) {
            setCart(Cart.filter(i => i.productID !== item.productID));

        } else {
            let product = Cart.find((pr) => pr.productID === item.productID);
            if (product) {
                setCart(
                    Cart.map((x) => {
                        if (x.productID === item.productID)
                            return {
                                ...x,
                                productQuantity: Op == "add" ? x.productQuantity + 1 : x.productQuantity - 1,
                            };
                        return x;
                    })
                );
            } else {
                const newItem = {
                    productID: item.productID,
                    productName: item.productName,
                    productPrice: item.productPrice,
                    productImg1: item.productImg1,
                    productQuantity: 1
                };
                const newItems = [...Cart, newItem];
                setCart(newItems);
            }
        }



    };


    const getValues = () => {
        return {
            isLogin, setIslogin,
            UserInformation, setUserInformation,
            Cart, setCart,
            AddToCart, Sum,
            orderScreen, setOrderScreen,
            Message, setMessage,
        }
    }
    return (
        <DataStorageContext.Provider value={getValues()}>
            {children}
        </DataStorageContext.Provider>
    );
}


export function withDataStorageContext(Component) {
    class ComponentWithContext extends React.Component {
        render() {
            return (
                <DataStorageContext.Consumer>
                    {(value) => <Component {...this.props} DataStorageProvider={value} />}
                </DataStorageContext.Consumer>
            );
        }
    }
    return ComponentWithContext;
}
