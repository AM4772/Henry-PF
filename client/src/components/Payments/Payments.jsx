// import { useEffect } from "react";
// import { useSelector } from "react-redux";
// import { useHistory } from "react-router-dom";
// import PaymentCard from "../PaymentCard/PaymentCard";
import s from "./Payments.module.sass";
import { TESTING_PAYMENTS } from "../../TESTING_PAYMENTS";

const Payments = () => {
  // const history = useHistory();
  // const { favourites } = useSelector((state) => state.profile);
  // const { stack } = useSelector((state) => state.history);
  // useEffect(() => {}, []);

  let payment = TESTING_PAYMENTS;

  return payment.length > 0 ? (
    <div className={s.containerPay0}>
      {/* <div className={s.backButton}>
        <button className={s.buttonBack}>Back</button>
      </div> */}
      <div className={s.tableContainer}>
        <table>
          <thead>
            <tr className={s.sticky}>
              <th>ID Payment</th>
              <th>Items Buyed</th>
              <th>UserID</th>
              <th>Username</th>
              <th>Buy Date</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {payment.map((b) => (
              /*<PaymentCard
                  key={b.ID}
                  ID={b.ID}
                  totalItems={b.purchasedBooks.length}
                  userID={b.userInfo.userID}
                  username={b.userInfo.username}
                  buyDate={b.purchaseDate}
                  price={
                    b.purchasedBooks.reduce((ac, el) => ({
                      price: ac.price + el.price,
                    })).price
                  }
                />*/
              <tr key={b.ID}>
                <td>{b.ID}</td>
                <td>{b.purchasedBooks.length}</td>
                <td>{b.userInfo.userID}</td>
                <td>{b.userInfo.username}</td>
                <td>{new Date(b.purchaseDate).toLocaleDateString("es-ES")}</td>
                <td>
                  $
                  {new Intl.NumberFormat("es-ES", {
                    maximumFractionDigits: 2,
                    minimumFractionDigits: 2,
                  }).format(
                    b.purchasedBooks.reduce((ac, el) => ({
                      price: ac.price + el.price,
                    })).price
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  ) : (
    <div className={s.containerNotPaym}>
      <div className={s.NotPaym}>
        <h4>There are not payments yet</h4>
      </div>
    </div>
  );
};

export default Payments;
