
const orderBookList = (req, res) => {
    res.status(200).send({
        code : 2000,
        messageKey : "orderbook.list.success",
        data : {}
    });
}

module.exports = {
    orderBookList: orderBookList
}