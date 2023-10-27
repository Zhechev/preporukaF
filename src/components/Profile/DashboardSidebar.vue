<script>
</script>

<template>
            <div class="utf_dashboard_navigation visible-md visible-lg visible-xl collapsed" id="collapseNavMenu">
                <div class="utf_dashboard_navigation_inner_block">
                    <ul>
                    <li class="active"><router-link :to="{name:'profile'}" class="link"><span class="i"><font-awesome-icon :icon="['fas', 'layer-group']" /></span> Dashboard</router-link></li>       
                    <li>
                        <router-link :to="{ name: 'createVenue' }" class="link">
                            <span class="i"><font-awesome-icon :icon="['fas', 'circle-plus']" /></span> Add Venue
                        </router-link>
                    </li>                
                    <li v-if="user && user.venues_owned_count">
                        <div class="dropdown">
                            <button class="dropdown-toggle link" type="button" id="myListings" data-bs-toggle="dropdown" aria-expanded="false">
                                <span class="i"><font-awesome-icon :icon="['fas', 'list-ul']" /></span> My Listingsсс
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
                    <li><a class="link" href="dashboard_messages.html"><span class="i"><font-awesome-icon :icon="['fas', 'envelope-open']" /></span> Messages</a></li>
                    <li><a class="link" href="dashboard_wallet.html"><span class="i"><font-awesome-icon :icon="['fas', 'wallet']" /></span> Wallet</a></li>		            
                    <li><a class="link" href="dashboard_wallet.html"><span class="i"><font-awesome-icon :icon="['fas', 'star']" /></span> Reviews</a></li>		            		  
                    <li><a class="link" href="dashboard_my_profile.html"><span class="i"><font-awesome-icon :icon="['fas', 'user']" /></span> Edit Profile</a></li>
                    <li><a class="link" href="dashboard_change_password.html"><span class="i"><font-awesome-icon :icon="['fas', 'key']" /></span> Change Password</a></li>
                    <li><a class="link" href="index_1.html"><span class="i"><font-awesome-icon :icon="['fas', 'power-off']" /></span> Logout</a></li>
                    </ul>
                </div>
            </div> 
</template>