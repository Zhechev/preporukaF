<template>
	<div id="main_wrapper">
		<form action="" id="add_venue_form" enctype="multipart/form-data" method="POST">
			<input type="hidden" name="lat" value="" id="lat" />
			<input type="hidden" name="lng" value="" id="lng" />
			<input type="hidden" name="category_id" value="" />
			<div class="container margin-bottom-75">
				<div class="row">
					<div class="col-lg-12">
						<div id="utf_add_listing_part">
							<div class="add_utf_listing_section margin-top-45">
								<div class="utf_add_listing_part_headline_part">
									<h3>
										<i class="sl sl-icon-tag"></i>category title
									</h3>
								</div>
								<div class="row with-forms">
									<div class="col-md-6">
										<h5>text title</h5>
										<input type="text" class="search-field" name="title" id="title" placeholder="text title" value="">
									</div>
								</div>
							</div>
							<div class="add_utf_listing_section margin-top-45">
								<div class="utf_add_listing_part_headline_part">
									<h3>
										<i class="sl sl-icon-map"></i> location
									</h3>
								</div>
								<div class="utf_submit_section">
									<div class="row with-forms">
										<div class="col-md-6">
											<h5>text city</h5>
											<div class="intro-search-field utf-chosen-cat-single" id="city_id_div">
												<select class="" name="city_id" data-selected-text-format="count" data-size="7" title="city" id="city_id">
													<option value="" data-lat="" data-lng="">test</option>
													<option value="" data-lat="" data-lng="">test1</option>
													<option value="" data-lat="" data-lng="">test2</option>
												</select>
											</div>
										</div>
										<div class="col-md-6">
											<h5>adddress</h5>
											<input type="text" class="input-text" name="address" id="address" placeholder="address" value="">
										</div>
										<div id="utf_listing_location" class="col-md-12 utf_listing_section map">
											<div id="map" style="height: 500px;"></div>
										</div>
									</div>
								</div>
							</div>
							<div class="add_utf_listing_section margin-top-45">
								<div class="utf_add_listing_part_headline_part">
									<h3>
										<i class="sl sl-icon-picture"></i> imgaes
									</h3>
								</div>

								<div class="row with-forms">
									<div class="utf_submit_section col-md-6">
										<h4>cover image</h4>
										<input type="file" name="coverImage" />
									</div>
									<div class="utf_submit_section col-md-6">
										<h4>other images</h4>
										<input type="file" name="images[]" multiple/>
									</div>
								</div>
							</div>
							<div class="add_utf_listing_section margin-top-45">
		<div class="utf_add_listing_part_headline_part">
			<h3>
				<i class="sl sl-icon-list"></i> content
			</h3>
		</div>
		<div class="row with-forms">
			<div class="col-md-6">
				<h5>phone</h5>
				<input type="text" name="phone" id="phone" placeholder="phone">
			</div>
			<div class="col-md-6">
				<h5>Email</h5>
				<input type="text" name="email" id="email" placeholder="Email">
			</div>
			<div class="col-md-6">
				<h5>Website</h5>
				<input type="text" name="website" placeholder="Website">
			</div>
			<div class="col-md-6">
				<h5>Facebook</h5>
				<input type="text" name="facebook" placeholder="Facebook">
			</div>
			<div class="col-md-6">
				<h5>Instagram</h5>
				<input type="text" name="instagram" placeholder="Instagram">
			</div>
			<div class="col-md-12">
				<h5>desctiption bg</h5>
				<textarea name="content_bg" cols="40" rows="3" id="content_bg" placeholder="content..." spellcheck="true"></textarea>
			</div>
			<div class="col-md-12">
				<h5>description en</h5>
				<textarea name="content_en" cols="40" rows="3" id="content_en" placeholder="content..." spellcheck="true"></textarea>
			</div>
		</div>
	</div>
	<div class="add_utf_listing_section margin-top-45">
		<div class="utf_add_listing_part_headline_part">
			<h3>
				<i class="sl sl-icon-home"></i> Features
			</h3>
		</div>
		<div class="checkboxes in-row amenities_checkbox">
			<ul>
				<li>
					<input id="" value="" type="checkbox" name="features_bool[]">
					<label for=""></label>
				</li>
			</ul>
		</div>
	</div>
	<div class="add_utf_listing_section margin-top-45">
		<div class="utf_add_listing_part_headline_part">
			<h3>
				<i class="sl sl-icon-clock"></i> OPening hours
			</h3>
		</div>
		<div class="switcher-content">
			<div class="row utf_opening_day utf_js_demo_hours">
				<div class="col-md-2">
					<h5>Monday :-</h5>
				</div>
				<div class="col-md-5">
					<select class="utf_chosen_select" data-placeholder="Open Time"></select>
				</div>
				<div class="col-md-5">
					<select class="utf_chosen_select" data-placeholder="Close Time"></select>
				</div>
			</div>
			<div class="row utf_opening_day utf_js_demo_hours">
				<div class="col-md-2">
					<h5>Tuesday :-</h5>
				</div>
				<div class="col-md-5">
					<select class="utf_chosen_select" data-placeholder="Open Time"></select>
				</div>
				<div class="col-md-5">
					<select class="utf_chosen_select" data-placeholder="Close Time"></select>
				</div>
			</div>
			<div class="row utf_opening_day utf_js_demo_hours">
				<div class="col-md-2">
					<h5>Wednesday :-</h5>
				</div>
				<div class="col-md-5">
					<select class="utf_chosen_select" data-placeholder="Open Time"></select>
				</div>
				<div class="col-md-5">
					<select class="utf_chosen_select" data-placeholder="Close Time"></select>
				</div>
			</div>
			<div class="row utf_opening_day utf_js_demo_hours">
				<div class="col-md-2">
					<h5>Thursday :-</h5>
				</div>
				<div class="col-md-5">
					<select class="utf_chosen_select" data-placeholder="Open Time"></select>
				</div>
				<div class="col-md-5">
					<select class="utf_chosen_select" data-placeholder="Close Time"></select>
				</div>
			</div>
			<div class="row utf_opening_day utf_js_demo_hours">
				<div class="col-md-2">
					<h5>Friday :-</h5>
				</div>
				<div class="col-md-5">
					<select class="utf_chosen_select" data-placeholder="Open Time"></select>
				</div>
				<div class="col-md-5">
					<select class="utf_chosen_select" data-placeholder="Close Time"></select>
				</div>
			</div>
			<div class="row utf_opening_day utf_js_demo_hours">
				<div class="col-md-2">
					<h5>Saturday :-</h5>
				</div>
				<div class="col-md-5">
					<select class="utf_chosen_select" data-placeholder="Open Time"></select>
				</div>
				<div class="col-md-5">
					<select class="utf_chosen_select" data-placeholder="Close Time"></select>
				</div>
			</div>
			<div class="row utf_opening_day utf_js_demo_hours">
				<div class="col-md-2">
					<h5>Sunday :-</h5>
				</div>
				<div class="col-md-5">
					<select class="utf_chosen_select" data-placeholder="Open Time"></select>
				</div>
				<div class="col-md-5">
					<select class="utf_chosen_select" data-placeholder="Close Time"></select>
				</div>
			</div>
		</div>
	</div>
	<div class="add_utf_listing_section margin-top-45">
		<div class="utf_add_listing_part_headline_part">
			<h3>
				<i class="sl sl-icon-tag"></i> Add Pricing
			</h3>
		</div>
		<div class="row">
			<div class="col-md-12">
				<table id="utf_pricing_list_section">
					<tbody class="ui-sortable">
						<tr class="pricing-list-item pattern ui-sortable-handle">
							<td>
								<div class="fm-move">
									<i class="sl sl-icon-cursor-move"></i>
								</div>
								<div class="fm-input pricing-name">
									<input type="text" placeholder="Title">
								</div>
								<div class="fm-input pricing-ingredients">
									<input type="text" placeholder="Description">
								</div>
								<div class="fm-input pricing-price">
									<i class="data-unit">$</i>
									<input type="text" placeholder="Price" data-unit="$">
								</div>
								<div class="fm-close">
									<a class="delete" href="#">
										<i class="fa fa-remove"></i>
									</a>
								</div>
							</td>
						</tr>
					</tbody>
				</table>
				<a href="#" class="button add-pricing-list-item">Add Item</a>
				<a href="#" class="button add-pricing-submenu">Add Category</a>
			</div>
		</div>
	</div>
	<div class="add_utf_listing_section margin-top-45">
		<div class="utf_add_listing_part_headline_part">
			<h3>
				<i class="sl sl-icon-docs"></i> Your Listing Feature
			</h3>
		</div>
		<div class="checkboxes in-row amenities_checkbox">
			<ul>
				<li>
					<input id="check-a1" type="checkbox" name="check">
					<label for="check-a1">Accepts Credit Cards</label>
				</li>
				<li>
					<input id="check-b1" type="checkbox" name="check">
					<label for="check-b1">Smoking Allowed</label>
				</li>
				<li>
					<input id="check-c1" type="checkbox" name="check">
					<label for="check-c1">Bike Parking</label>
				</li>
				<li>
					<input id="check-d1" type="checkbox" name="check">
					<label for="check-d1">Hostels</label>
				</li>
				<li>
					<input id="check-e1" type="checkbox" name="check">
					<label for="check-e1">Wheelchair Accessible</label>
				</li>
				<li>
					<input id="check-f1" type="checkbox" name="check">
					<label for="check-f1">Wheelchair Internet</label>
				</li>
				<li>
					<input id="check-g1" type="checkbox" name="check">
					<label for="check-g1">Wheelchair Accessible</label>
				</li>
				<li>
					<input id="check-h1" type="checkbox" name="check">
					<label for="check-h1">Parking Street</label>
				</li>
				<li>
					<input id="check-i1" type="checkbox" name="check">
					<label for="check-i1">Wireless Internet</label>
				</li>
			</ul>
		</div>
	</div>
	<button class="button preview">
		<i class="fa fa-arrow-circle-right"></i> Save
	</button>
						</div>
					</div>
				</div>
			</div>
		</form>
	</div>
</template>
