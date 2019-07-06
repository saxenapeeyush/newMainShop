const config = {
    dbConfig : 'mongodb+srv://peeyush:peeyush123@cluster0-sicof.mongodb.net/shoprole?retryWrites=true&w=majority',
    SUCCESS:'S',
    FAILURE:'F',
    ERROR:'E',
    NOT_FOUND:'NF',
    EMPTY:'EM',
    ADMIN:'admin',
    orderPlaced:"placed",
    orderDelivered:"delivered",
    orderOut:"out for delivery",
    ADMINPASS:'admin',
    excelMimeType :['application/vnd.ms-excel'],
    ROLE:{
        ROLESTATUS:'Active',
        ROLEADMINDESC:'Admin has the Super Power and Have all the rights to access Each and everything in the Application ',
        ROLENAME:'admin'
    },
    RIGHT: {
        adminRights:[
            {
                "rightName":'Add User',
                "rightUri":'/addUser'
            },
            {
                "rightName":'Add Role & Right',
                "rightUri":'/addRole'
            },
           
            {
                "rightName":'Payment Method',
                "rightUri":'/paymentMethod'
            },
            {
                "rightName":'Add Product',
                "rightUri":'/addProduct'
            },
            {
                "rightName":'Deleted Product',
                "rightUri":'/recoverProduct'
            },
            {
                "rightName":'Deal Of The Day',
                "rightUri":'/dealoftheday'
            },
            {
                "rightName":'All Orders',
                "rightUri":'/allorders'
            },
            {
                "rightName":'Delivery Boys',
                "rightUri":'/deliveryboys'
            }
        ],
        rightStatus:'Active',
    
    DELIVERYBOYRIGHTS:[
        {
            "rightName":'Previous Orders',
            "rightUri":'/previousorders'      },
            {"rightName":'Current Orders',
            "rightUri":'/currentorders'  },
            {"rightName":'Pending Orders',
            "rightUri":'/pendingorders'  }
    ]
    },
    ADMINSTATUS:'Active',
    ISFIRSTTIME:true,
    SECRET:'mysecret',
    defaultImage:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAANlBMVEX////BwcHy8vK+vr7Pz8/j4+PU1NTIyMjw8PDFxcX19fXZ2dn7+/vMzMzr6+v4+Pjf39/Y2Ni9AdPSAAADi0lEQVR4nO2d4bqiIBBAMyrTNLvv/7JbG+5mMqCmDHTP+U1ejjjIDPjd3Q4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACWUu+TYRvBm0mHttlAsDZFOpjLBob7pAxPGGKIoTYYYoihPhiuYKiwFo1seDlGp4pqaDbKX3yUcQ3PG/yFABh+DIabg+HHYLg5GH7MpoZNXXehNhkbdrf2sc6tTldvs3wNL4W9sjGtbzGYq2HXDq57lFtmathUw7TTo5ipYfueV8tZS56G13HhoJTa5mlYvfvdLy3NqFkaOoawKA5C4ywNL87qlrA3mKXhwSUozTVZGrZOQ+HaGH5MvKe0djfO0vDmmmmqb5ppXDsFYuezNHQFonjpPA3Hg2ikF36mho53vngWKFPD3eFNUc6BczUcjKKpPEl+toa7c/ncGzTG3Hzt8jW8O17asipPR/9xvMiGof3Dxl83W0JiY3jwP3FLSMvwvhwTc/WlJGV4NlOe5JmkZNg8yy/SEnohKRnat7hpV+1AQob/ciLzs2YH0jF8aegr0s8mGcOmmtZuNskYngZL6Sq4LTiZVAyPbzstYpF+NokYjlLa9fqSiOF4I2K12SYNw9MoZfdstcwkCcOjQ/COUACdSQrZk/Rp1LTZJjTUKYyhYzfw2Vqsn71wCC3yEjB0BaFtHkwWm9aE1rH6hkIQPtsHHsH674EF/1irGwa+T/TONvv+sj5FdUMpCHs8yeL/zW6forahHIT2F3KQvT7enq4rG/qC0P5E+rB1WNiXc0pdwzrkV4jLt/fBF++ErmFZTMA1ATejQ1GioqphKAh7RrNNV7kWsm5FTUPnwR8Ho9lm756A3QsERcMpQejs2Fm6M05FRcNJQejoumf+dc1KeoY/cz5MfFm+OQ9ieBTVDKcGYU9fmgrcmPFKVsuwm/tpqU0Wx2+JkKKW4YwgtD99LD27Mnxj3hWVDN3nJ/09v9lkaaaiThVjbhBaxakNB29dlTGcHYT215MbSi+laIbO05Or8lLx0jBcEISz+V8bUDBcFITLFeMbdjH8iqLqFeMbbh+EVrFTMowRhFax0TDcxwnCV8W4hsU1VDxcE1M28Q1jCtqd5MiGkXnUP77b8KH45Yb3pOvbDYdgiCGG+mCIIYb6YIghhvpgiOEvNexMQorrf/v34HpIhy3+NQIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMAv4Q9ycD+M7WmYEQAAAABJRU5ErkJggg==",
    orderStatusInitial:"placed",
    paymentStatusForCod:"pending",
    deliveryPassword:"db12345"
}
module.exports=config;