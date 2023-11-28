<script setup>
import { useRoute } from 'vue-router';

const route = useRoute();
const userId = route.params.userId;
console.log(userId);
</script>

<template>
  <div id="invoice">
    <div class="row">
      <div class="col-md-6">
        <div id="logo"><a href="index_1.html"><img src="images/logo.png" alt=""></a></div>
      </div>
      <div class="col-md-6">
        <p id="details">
          <strong>Order Number:-</strong> 0043128641<br>
          <strong>Email:-</strong> support@example.com<br>
          <strong>Phone Number:-</strong> +1 (0123) 456 7890
        </p>
      </div>
    </div>

    <div class="row">
      <div class="col-md-12">
        <h2 class="invoice_title">U-Listing Invoice</h2>
      </div>
      <div class="col-md-6">
        <p><strong>Billed To:</strong><br>
          1789 Williamson Plaza, Maggieberg,<br> MT 878, United States
        </p>
      </div>
      <div class="col-md-6 fl_right">
        <p><strong>Shipped To:</strong><br>
          267 Suzanne Throughway, Breannabury,<br> OR 45801, United States
        </p>
      </div>
      <div class="col-md-6">
        <p><strong>Payment Method:</strong><br>
          Visa ending **** 2222<br>
          support@example.com
        </p>
      </div>
      <div class="col-md-6 fl_right">
        <p><strong>Order Date:</strong><br>
          22 January 2021
        </p>
      </div>
    </div>

    <div class="row">
      <div class="col-md-12">
        <table class="margin-top-20">
          <tr>
            <th>Item</th>
            <th>Quantity</th>
            <th>Hour</th>
            <th>Price</th>
          </tr>
          <tr>
            <td>Basic Plan</td>
            <td>1</td>
            <td>5</td>
            <td>$29.00</td>
          </tr>
          <tr>
            <td>Business Plan</td>
            <td>3</td>
            <td>7</td>
            <td>$49.00</td>
          </tr>
          <tr>
            <td>Premium Plan</td>
            <td>6</td>
            <td>12</td>
            <td>$69.00</td>
          </tr>
        </table>
      </div>
      <div class="col-md-12">
        <table id="totals">
          <tr>
            <th>Shipping</th>
            <th><span>$13.00</span></th>
          </tr>
          <tr>
            <th>Total Pay</th>
            <th><span>$160.00</span></th>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
@charset "UTF-8";

/*Google Fonts*/
@import url('https://fonts.googleapis.com/css?family=Nunito:300,400,600,600i,700,800&subset=latin-ext');

#invoice {
	background: #fff;
	width: auto;
	max-width: 900px;
	padding: 60px;
	margin: 60px auto 60px auto;
	border-radius: 8px;
	border:1px solid rgba(0, 0, 0, 0.15);
	box-shadow:0 3px 15px 0 rgba(0,0,0,0.1);
  background-color: #ffe6e6; 
}

h2.invoice_title{
	background:#f2f2f2;	
	text-align:center;	
	border:1px solid rgba(0, 0, 0, 0.1);
	padding:15px 20px;
	border-radius:30px;
	font-size:30px;
	font-weight:500;
}

#logo img {
	max-height: 44px;
}
#details {
	text-align: right;
	line-height:32px;
}
table {
	width: 100%;
	margin: 0;
	padding: 1px 0;
	border-spacing: 0;
	border-bottom: 1px solid #ddd;
}
th, td {
	padding: 8px 0;
	text-align: center;
	border-bottom:1px solid #ddd
}
th {
	font-weight: 600;
	border-bottom: 1px solid #ddd;
	font-size: 16px;
	color: #333;
}
th:first-child, td:first-child {
	text-align: left;
}
th:last-child, td:last-child {
	text-align: right;
}
th span {
	position: relative;
	display: inline-block;
	height: 100%;
}
@media (max-width: 767px) {
#invoice{
	padding:50px 20px;
}	
#logo{
	text-align: center;
	margin-bottom: 30px;
}
}
.margin-top-20 {
	margin-top: 20px;
}
.margin-bottom-5 {
	margin-bottom: 5px;
}
.margin-bottom-15 {
	margin-bottom: 15px;
}
span.title_block{
	font-size:20px;	
	font-weight: 500;
	margin-bottom:15px;
    color: #333;
    display: inline-block;
}
.fl_right{
	float:right;
	text-align:right;
}
.print-button:hover {
	color:#333;
	background-color: #e6e6e6;
	transition: 0.3s;
	box-shadow:0 3px 5px 0 rgba(0,0,0,0.1);
}
</style>