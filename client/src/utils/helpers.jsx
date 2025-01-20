import moment from "moment/moment.js";

export default function convertDate(date){
    return date ? moment(date).format('DD/MM/YYYY') : "---";
}