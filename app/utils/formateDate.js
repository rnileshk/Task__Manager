const moment = require("moment/moment");

const formateDate = (date) => {
    return moment(date).format("DD/MM/YYYY");
};

export default formateDate;