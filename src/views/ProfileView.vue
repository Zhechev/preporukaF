<script setup>

</script>

<template>

    <!-- Wrapper -->
    <div id="main_wrapper"> 
    <!-- Dashboard -->
    <div id="dashboard"> 
        <a class="utf_dashboard_nav_responsive" data-bs-toggle="collapse" href="#collapseNavMenu" role="button" aria-expanded="false" aria-controls="collapseNavMenu">
            <span class="i"><font-awesome-icon :icon="['fas', 'bars']" /></span> Dashboard Sidebar Menu</a>
        <div class="utf_dashboard_navigation visible-md visible-lg visible-xl collapsed" id="collapseNavMenu">
            <div class="utf_dashboard_navigation_inner_block">
                <ul>
                <li class="active"><a class="link" href="dashboard.html"><span class="i"><font-awesome-icon :icon="['fas', 'layer-group']" /></span> Dashboard</a></li>       
                <li><a class="link" href="dashboard_add_listing.html"><span class="i"><font-awesome-icon :icon="['fas', 'circle-plus']" /></span> Add Listing</a></li>	          
                <li>
                    <div class="dropdown">
                        <button class="dropdown-toggle link" type="button" id="myListings" data-bs-toggle="dropdown" aria-expanded="false">
                            <span class="i"><font-awesome-icon :icon="['fas', 'list-ul']" /></span> My Listings
                        </button>
                        <div class="dropdown-menu dmenu" aria-labelledby="myListings">
                            <ul>
                                <li><a class="link" href="dashboard_my_listing.html">Active <span class="nav-tag green">10</span></a></li>
                                <li><a class="link" href="dashboard_my_listing.html">Pending <span class="nav-tag yellow">4</span></a></li>
                                <li><a class="link" href="dashboard_my_listing.html">Expired <span class="nav-tag red">8</span></a></li>
                            </ul>	        
                        </div>
                    </div>
                </li>		  		 
                <li><a class="link" href="dashboard_bookings.html"><span class="i"><font-awesome-icon :icon="['fas', 'file']" /></span> Bookings</a></li>		  
                <li><a class="link" href="dashboard_messages.html"><span class="i"><font-awesome-icon :icon="['fas', 'envelope-open']" /></span> Messages</a></li>
                <li><a class="link" href="dashboard_wallet.html"><span class="i"><font-awesome-icon :icon="['fas', 'wallet']" /></span> Wallet</a></li>		            
                <li>
                    <div class="dropdown">
                        <button class="dropdown-toggle link" type="button" id="reviews" data-bs-toggle="dropdown" aria-expanded="false">
                            <span class="i"><font-awesome-icon :icon="['fas', 'star']" /></span> Reviews
                        </button>
                        <div class="dropdown-menu dmenu" aria-labelledby="reviews">
                            <ul>
                                <li><a class="link" href="dashboard_visitor_review.html">Visitor Reviews <span class="nav-tag green">4</span></a></li>
                                <li><a class="link" href="dashboard_submitted_review.html">Submitted Reviews <span class="nav-tag yellow">5</span></a></li>
                            </ul>	        
                        </div>
                    </div>
                </li>		  
                <li><a class="link" href="dashboard_bookmark.html"><span class="i"><font-awesome-icon :icon="['fas', 'heart']" /></span> Bookmark</a></li>                                    		 
                <li><a class="link" href="dashboard_my_profile.html"><span class="i"><font-awesome-icon :icon="['fas', 'user']" /></span> My Profile</a></li>
                <li><a class="link" href="dashboard_change_password.html"><span class="i"><font-awesome-icon :icon="['fas', 'key']" /></span> Change Password</a></li>
                <li><a class="link" href="index_1.html"><span class="i"><font-awesome-icon :icon="['fas', 'power-off']" /></span> Logout</a></li>
                </ul>
            </div>
        </div>    
        <div class="utf_dashboard_content"> 
        <div id="titlebar" class="dashboard_gradient">
            <div class="row">
            <div class="col-md-12">
                <h2>Dashboard</h2>
                <nav id="breadcrumbs">
                    <div class="item"><a href="index_1.html">Home</a></div>
                    <div class="arrows"><font-awesome-icon :icon="['fas', 'angles-right']" /></div>
                    <div class="item">Dashboard</div>
                </nav>
            </div>
            </div>
        </div>
        
        <div class="row">
            <div class="col-md-12">
            <div class="notification success closeable margin-bottom-30">
                <p>You are currently signed in as <strong>Jonathon Cristy</strong> Has Been Approved!</p>
                <a class="close" href="#"></a> 
            </div>
            </div>
        </div>
        
        <div class="row"> 
            <div class="col-lg-2 col-md-6">
            <div class="utf_dashboard_stat color-1">
                <div class="utf_dashboard_stat_content">
                <h4>36</h4>
                <span>Published Listings</span>
                </div>
                <div class="utf_dashboard_stat_icon"><span class="i"><font-awesome-icon :icon="['fas', 'map-location-dot']" /></span></div>
            </div>
            </div>
            
            <div class="col-lg-2 col-md-6">
            <div class="utf_dashboard_stat color-2">
                <div class="utf_dashboard_stat_content">
                <h4>615</h4>
                <span>Pending Listings</span>
                </div>
                <div class="utf_dashboard_stat_icon"><span class="i"></span></div>
            </div>
            </div>
            
            <div class="col-lg-2 col-md-6">
            <div class="utf_dashboard_stat color-3">
                <div class="utf_dashboard_stat_content">
                <h4>9128</h4>
                <span>Expired Listings</span>
                </div>
                <div class="utf_dashboard_stat_icon"><span class="i"><font-awesome-icon :icon="['fas', 'align-justify']" /></span></div>
            </div>
            </div>
            
            <div class="col-lg-2 col-md-6">
            <div class="utf_dashboard_stat color-4">
                <div class="utf_dashboard_stat_content">
                <h4>572</h4>
                <span>New Feedbacks</span>
                </div>
                <div class="utf_dashboard_stat_icon"><span class="i"></span></div>
            </div>
            </div>
        
            <div class="col-lg-2 col-md-6">
            <div class="utf_dashboard_stat color-5">
                <div class="utf_dashboard_stat_content">
                <h4>572</h4>
                <span>Total Views</span>
                </div>
                <div class="utf_dashboard_stat_icon"><span class="i"><font-awesome-icon :icon="['fas', 'eye']" /></span></div>
            </div>
            </div>
            
            <div class="col-lg-2 col-md-6">
            <div class="utf_dashboard_stat color-6">
                <div class="utf_dashboard_stat_content">
                <h4>572</h4>
                <span>Total Reviews</span>
                </div>
                <div class="utf_dashboard_stat_icon"><span class="i"><font-awesome-icon :icon="['fas', 'star']" /></span></div>
            </div>
            </div>
        </div>
        <div class="row"> 
            <div class="col-lg-6 col-md-12">
            <div class="utf_dashboard_list_box with-icons margin-top-20">
                <h4>Recent Activities</h4>
                <ul>
                <li> 
                    <span class="i utf_list_box_icon"><font-awesome-icon :icon="['fas', 'list-ul']" /></span> Peter Parker Left A Review 5.0 On <strong><a href="#"> Restaurant</a></strong> <a href="#" class="close-list-item"><span class="i"><font-awesome-icon :icon="['fas', 'xmark']" /></span></a> 
                </li>
                <li> 
                    <span class="i utf_list_box_icon"><font-awesome-icon :icon="['fas', 'star']" /></span> Your Listing <strong><a href="#">Local Service</a></strong> Has Been Approved<a href="#" class="close-list-item"><span class="i"><font-awesome-icon :icon="['fas', 'xmark']" /></span></a> 
                </li>
                <li> 
                    <span class="i utf_list_box_icon"><font-awesome-icon :icon="['fas', 'heart']" /></span> Someone Bookmarked Your <strong><a href="#">Listing</a></strong> Restaurant <a href="#" class="close-list-item"><span class="i"><font-awesome-icon :icon="['fas', 'xmark']" /></span></a> 
                </li>              
                <li> 
                    <span class="i utf_list_box_icon"><font-awesome-icon :icon="['fas', 'star']" /></span> Your Listing <strong><a href="#">Local Service</a></strong> Has Been Approved<a href="#" class="close-list-item"><span class="i"><font-awesome-icon :icon="['fas', 'xmark']" /></span></a> 
                </li>
                <li> 
                    <span class="i utf_list_box_icon"><font-awesome-icon :icon="['fas', 'list-ul']" /></span> Someone Bookmarked Your <strong><a href="#">Listing</a></strong> Restaurant <a href="#" class="close-list-item"><span class="i"><font-awesome-icon :icon="['fas', 'xmark']" /></span></a> 
                </li>			  
                <li> 
                    <span class="i utf_list_box_icon"><font-awesome-icon :icon="['fas', 'list-ul']" /></span> Peter Parker Left A Review 5.0 On <strong><a href="#"> Restaurant</a></strong> <a href="#" class="close-list-item"><span class="i"><font-awesome-icon :icon="['fas', 'xmark']" /></span></a> 
                </li>
                <li>
                    <span class="i utf_list_box_icon"><font-awesome-icon :icon="['fas', 'star']" /></span> Someone Bookmarked Your <strong><a href="#">Listing</a></strong> Restaurant <a href="#" class="close-list-item"><span class="i"><font-awesome-icon :icon="['fas', 'xmark']" /></span></a> 
                </li>
                <li> 
                    <span class="i utf_list_box_icon"><font-awesome-icon :icon="['fas', 'list-ul']" /></span> Peter Parker Left A Review 5.0 On <strong><a href="#"> Restaurant</a></strong> <a href="#" class="close-list-item"><span class="i"><font-awesome-icon :icon="['fas', 'xmark']" /></span></a> 
                </li>
                <li> 
                    <span class="i utf_list_box_icon"><font-awesome-icon :icon="['fas', 'star']" /></span> Your Listing <strong><a href="#">Local Service</a></strong> Has Been Approved<a href="#" class="close-list-item"><span class="i"><font-awesome-icon :icon="['fas', 'xmark']" /></span></a> 
                </li>
                <li> 
                    <span class="i utf_list_box_icon"><font-awesome-icon :icon="['fas', 'heart']" /></span> Someone Bookmarked Your <strong><a href="#">Listing</a></strong> Restaurant <a href="#" class="close-list-item"><span class="i"><font-awesome-icon :icon="['fas', 'xmark']" /></span></a> 
                </li>
                </ul>
            </div>
            <div class="clearfix"></div>
            <div class="utf_pagination_container_part margin-top-30 margin-bottom-30">
                <nav class="pagination">
                <ul>
                    <li><a href="#"><font-awesome-icon :icon="['fas', 'arrow-left']"
                      /></a></li>
                    <li><a href="#" class="current-page">1</a></li>
                    <li><a href="#">2</a></li>
                    <li><a href="#">3</a></li>
                    <li><a href="#"><font-awesome-icon :icon="['fas', 'arrow-right']"
                      /></a></li>
                </ul>
                </nav>
            </div>
            </div>
            <div class="col-lg-6 col-md-12">
            <div class="utf_dashboard_list_box invoices with-icons margin-top-20">
                <h4>All Order Invoices</h4>
                <ul>
                <li><i class="utf_list_box_icon sl sl-icon-doc"></i> <strong>Premium Plan <span class="paid">Paid</span></strong>
                    <ul>
                    <li><span>Order Number:-</span> 004128641</li>
                    <li><span>Date:-</span> 12 Jan 2021</li>
                    </ul>
                    <div class="buttons-to-right"> <a href="dashboard_invoice.html" class="button gray"><span class="i"><font-awesome-icon :icon="['fas', 'print']" /></span> Invoice</a> </div>
                </li>
                <li><i class="utf_list_box_icon sl sl-icon-doc"></i> <strong>Platinum Plan <span class="paid">Paid</span></strong>
                    <ul>
                    <li><span>Order Number:-</span> 004312641</li>
                    <li><span>Date:-</span> 12 Jan 2021</li>
                    </ul>
                    <div class="buttons-to-right"> <a href="dashboard_invoice.html" class="button gray"><span class="i"><font-awesome-icon :icon="['fas', 'print']" /></span> Invoice</a> </div>
                </li>
                <li><i class="utf_list_box_icon sl sl-icon-doc"></i> <strong>Platinum Plan <span class="paid">Paid</span></strong>
                    <ul>
                    <li><span>Order Number:-</span> 004312641</li>
                    <li><span>Date:-</span> 12 Jan 2021</li>
                    </ul>
                    <div class="buttons-to-right"> <a href="dashboard_invoice.html" class="button gray"><span class="i"><font-awesome-icon :icon="['fas', 'print']" /></span> Invoice</a> </div>
                </li>
                <li><i class="utf_list_box_icon sl sl-icon-doc"></i> <strong>Basic Plan <span class="unpaid">Unpaid</span></strong>
                    <ul>
                    <li><span>Order Number:-</span> 004031281</li>
                    <li><span>Date:-</span> 12 Jan 2021</li>
                    </ul>
                    <div class="buttons-to-right"> <a href="dashboard_invoice.html" class="button gray"><span class="i"><font-awesome-icon :icon="['fas', 'print']" /></span> Invoice</a> </div>
                </li>
                <li><i class="utf_list_box_icon sl sl-icon-doc"></i> <strong>Basic Plan <span class="unpaid">Unpaid</span></strong>
                    <ul>
                    <li><span>Order Number:-</span> 004031281</li>
                    <li><span>Date:-</span> 12 Jan 2021</li>
                    </ul>
                    <div class="buttons-to-right"> <a href="dashboard_invoice.html" class="button gray"><span class="i"><font-awesome-icon :icon="['fas', 'print']" /></span> Invoice</a> </div>
                </li>
                <li><i class="utf_list_box_icon sl sl-icon-doc"></i> <strong>Basic Plan <span class="unpaid">Unpaid</span></strong>
                    <ul>
                    <li><span>Order Number:-</span> 004031281</li>
                    <li><span>Date:-</span> 12 Jan 2021</li>
                    </ul>
                    <div class="buttons-to-right"> <a href="dashboard_invoice.html" class="button gray"><span class="i"><font-awesome-icon :icon="['fas', 'print']" /></span> Invoice</a> </div>
                </li>
                </ul>
            </div>
            </div>
            <div class="col-lg-12 col-md-12 mb-4">
            <div class="utf_dashboard_list_box table-responsive recent_booking">
                <h4>Recent Booking</h4>
                <div class="dashboard-list-box table-responsive invoices with-icons">
                <table class="table table-hover">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Booking Date</th>
                        <th>Payment Type</th>
                        <th>Status</th>
                        <th>View Booking</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>1</td>
                        <td><img alt="" class="img-fluid rounded-circle shadow-lg" src="images/thumb-1.jpg" width="50" height="50"></td>
                        <td>Kathy Brown</td>
                        <td>12 Jan 2021</td>
                        <td>Paypal</td>
                        <td><span class="badge badge-pill badge-primary text-uppercase">Booked</span></td>
                        <td><a href="dashboard_bookings.html" class="button gray"><span class="i"><font-awesome-icon :icon="['fas', 'eye']" /></span> View</a></td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td><img alt="" class="img-fluid rounded-circle shadow-lg" src="images/thumb-2.jpg" width="50" height="50"></td>
                        <td>Kathy Brown</td>
                        <td>12 Jan 2021</td>
                        <td>Credit Card</td>
                        <td><span class="badge badge-pill badge-primary text-uppercase">Booked</span></td>
                        <td><a href="dashboard_bookings.html" class="button gray"><span class="i"><font-awesome-icon :icon="['fas', 'eye']" /></span> View</a></td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td><img alt="" class="img-fluid rounded-circle shadow-lg" src="images/thumb-3.jpg" width="50" height="50"></td>
                        <td>Kathy Brown</td>
                        <td>12 Jan 2021</td>
                        <td>Paypal</td>
                        <td><span class="badge badge-pill badge-danger text-uppercase">Pending</span></td>
                        <td><a href="dashboard_bookings.html" class="button gray"><span class="i"><font-awesome-icon :icon="['fas', 'eye']" /></span> View</a></td>
                    </tr>
                    <tr>
                        <td>4</td>
                        <td><img alt="" class="img-fluid rounded-circle shadow-lg" src="images/thumb-1.jpg" width="50" height="50"></td>
                        <td>Kathy Brown</td>
                        <td>12 Jan 2021</td>
                        <td>Paypal</td>
                        <td><span class="badge badge-pill badge-danger text-uppercase">Pending</span></td>
                        <td><a href="dashboard_bookings.html" class="button gray"><span class="i"><font-awesome-icon :icon="['fas', 'eye']" /></span> View</a></td>
                    </tr>
                    <tr>
                        <td>5</td>
                        <td><img alt="" class="img-fluid rounded-circle shadow-lg" src="images/thumb-2.jpg" width="50" height="50"></td>
                        <td>Kathy Brown</td>
                        <td>12 Jan 2021</td>
                        <td>Paypal</td>
                        <td><span class="badge badge-pill badge-danger text-uppercase">Pending</span></td>
                        <td><a href="dashboard_bookings.html" class="button gray"><span class="i"><font-awesome-icon :icon="['fas', 'eye']" /></span> View</a></td>
                    </tr>
                    <tr>
                        <td>6</td>
                        <td><img alt="" class="img-fluid rounded-circle shadow-lg" src="images/thumb-3.jpg" width="50" height="50"></td>
                        <td>Kathy Brown</td>
                        <td>12 Jan 2021</td>
                        <td>Paypal</td>
                        <td><span class="badge badge-pill badge-canceled text-uppercase">Canceled</span></td>
                        <td><a href="dashboard_bookings.html" class="button gray"><span class="i"><font-awesome-icon :icon="['fas', 'eye']" /></span> View</a></td>
                    </tr>
                    </tbody>
                </table>
                </div>
            </div>
            </div>
            <div class="col-md-12">
            <div class="footer_copyright_part">Copyright © 2021 All Rights Reserved.</div>
            </div>
        </div>
        </div>    
    </div>  
    </div>
</template>