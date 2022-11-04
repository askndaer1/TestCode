import moment from "moment";

const Shadow = {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 2
}
const Colors = {
    Primary: '#34ace0',
    Seconder: "#f3f9f9",
    Text1: "#000",
    Text2: "#fff",
    MenuON: "#044e6e",
    MenuOFF: "#f9f9f9"
}


const list = []
const Category = []
const Currency = "RM"

const OrderStatus = ["Pending", "Preparing", "On Delivery", "Complete"]
const OrderStatusColor = ["#f1c40f", "#8e44ad", "#2980b9", "#27ae60"]
const CountryState = [
    { label: 'Sanaa', code: "sanaa" },
    { label: 'Aden', code: "aden" },
    { label: 'Al Hudaydah', code: "alhudaydah" },
    { label: 'Taiz', code: "taiz" },
    { label: 'Hadramaut', code: "hadramaut" },
    { label: 'Ibb', code: "ibb" },
    { label: 'Dhamar', code: "dhamar" },
    { label: 'Marib', code: "marib" },
    { label: 'Al Bayda', code: "albayda" },
    { label: 'Al Jawf', code: "aljawf" },
    { label: 'Al Mahrah', code: "almahrah" },
    { label: 'Al Mahwit', code: "akmahwit" },
    { label: 'Abyan', code: "abyan" },
    { label: 'Amran', code: "amran" },
    { label: 'Dhale', code: "dhale" },
    { label: 'Hajjah', code: "hajjah" },
    { label: 'Raymah', code: "raymah" },
    { label: 'Sadah', code: "sadah" },
    { label: 'Shabwah', code: "shabwah" },
    { label: 'Socotra', code: "socotra" },

]

const FromNOW = (date) => {
    moment.locale('ar');
    const momentDate = moment(date);
    return momentDate.fromNow()
}

const ReturnDate = (date) => {
    return moment(date).format(' dddd MMMM Do YYYY')

}

const ReturnTime = (date) => {
    return moment(date).format('h:mm a')
}

export { Shadow, Colors, Currency, list, Category, CountryState, OrderStatus, OrderStatusColor, FromNOW, ReturnDate, ReturnTime }
