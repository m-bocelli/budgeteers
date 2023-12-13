'use client';
import { Card, Col, Row } from 'react-bootstrap';
import { SEACREATURES } from '../constants/seacreatures';
import StoreItem from '../components/StoreItem/StoreItem';
import styles from './page.module.css';
import Button from '../components/Button/Button';
import { useEffect, useState } from 'react';
import { UserAuth } from '../js/AuthContext';
import Footer from "../components/Footer/Footer";

export default function StorePageUI() {
    const { user } = UserAuth();
    const [selected, setSelected] = useState([]);
    const [shop, setShop] = useState(SEACREATURES);
    const [total, setTotal] = useState(0);

    function select(_id) {
        const selectedItem = shop.find((item) => item.id === _id);
        const selectedCopy = [...selected];
        selectedCopy.splice(selected.length, 0, selectedItem);

        if (selected.includes(selectedItem)) {
            console.log('dup');
        } else {
            setSelected(selectedCopy);
            updateTotal(selectedCopy);
        }
    }

    function updateTotal(items) {
        const sum = items.reduce((sum, item) => sum + item.price, 0);
        setTotal(sum);
    }

    function dummyBuy() {
        const newSelected = [];
        setSelected(newSelected);
        updateTotal(newSelected);
    }

    return (
        <div>
            <Col className={styles.container}>
                <Row className={styles.row}>
                </Row>
                <Row className={styles.row}>
                    <div className={styles.cart_bar}>
                        <p>Total: {total}</p>
                        <Button onClick={dummyBuy}>BUY</Button>
                    </div>
                    <div className={styles.section}>
                        {selected.map((item) => {
                            return (
                                <StoreItem
                                    key={item.id}
                                    name={item.name}
                                    desc={item.desc}
                                    price={item.price}
                                    img={item.img}
                                    isSelected={true}
                                ></StoreItem>
                            );
                        })}
                    </div>
                </Row>
                <Row className={styles.row}>
                    <h2 className={styles.shop}>Shop🛒</h2>
                    <div className={styles.section}>
                        {shop.map((item) => {
                            return (
                                <StoreItem
                                    key={item.id}
                                    name={item.name}
                                    desc={item.desc}
                                    price={item.price}
                                    img={item.img}
                                    onClick={() => select(item.id)}
                                    isSelected={false}
                                ></StoreItem>
                            );
                        })}
                    </div>
                </Row>
            </Col>
            <Footer></Footer>
        </div>
    );
}
