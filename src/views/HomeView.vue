<script>
import { mapGetters } from "vuex";
import SearchComponent from "../components/common/SearchComponent.vue";

export default {
  components: {
    SearchComponent: SearchComponent,
  },
  name: "default-layout",
  methods: {
    debug: function () {
      console.log(this.categories);
    },
    getRandomProperty(obj) {
      return obj[Math.floor(Math.random() * obj.length)];
    },
    getCategoryName(category) {
      const lang = this.$i18n.locale;
      return category["category_name_" + lang];
    },
  },
  computed: {
    ...mapGetters({
      categories: "categories/categories",
      cities: "cities/cities",
    }),
  },
  mounted() {
    this.debug();
  },
};
</script>

<template>
  <div
    class="search_container_block home_main_search_part main_search_block"
    data-background-image="images/city_search_background.jpg"
  >
    <div class="main_inner_search_block">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <h2>
              {{ $t("text.find_best") }}
              <span class="typed-words">{{
                getCategoryName(getRandomProperty(categories))
              }}</span
              ><span class="typed-cursor">|</span>
            </h2>
            <h4>{{ $t("text.find_best_venues") }}</h4>
            <SearchComponent
              :categories="categories"
              :cities="cities"
            ></SearchComponent>
            <div class="main_popular_categories">
              <h3>explore categories</h3>
              <ul class="main_popular_categories_list">
                <li v-for="category in categories" :key="category.id">
                  <router-link
                    :to="{ name: 'showVenues' }"
                    :key="category.id"
                  >
                    <div class="utf_box">
                      <i :class="category.icon" aria-hidden="true"></i>
                      <p>{{ getCategoryName(category) }}</p>
                    </div>
                  </router-link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <h3 class="headline_part centered margin-top-75">Explore categories</h3>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <div class="container_categories_box margin-top-5 margin-bottom-30">
          <router-link
            v-for="category in categories"
            :to="{ name: 'showVenues' }"
            :key="category.id"
            class="utf_category_small_box_part"
          >
            <i :class="category.icon"></i>
            <h4>{{ getCategoryName(category) }}</h4>
            <span>{{ category.venues_count }}</span>
          </router-link>
        </div>
      </div>
    </div>
  </div>

  <section
    class="fullwidth_block margin-top-65 padding-top-75 padding-bottom-70"
    data-background-color="#f9f9f9"
  >
    <div class="container">
      <div class="row slick_carousel_slider">
        <div class="col-md-12">
          <h3 class="headline_part centered margin-bottom-45">
            Most Visited Places
            <span>Explore the greates places in the city</span>
          </h3>
        </div>

        <div class="row">
          <div class="col-md-12">
            <div class="simple_slick_carousel_block utf_dots_nav">
              <div class="utf_carousel_item">
                <a
                  href="listings_single_page_1.html"
                  class="utf_listing_item-container compact"
                >
                  <div class="utf_listing_item">
                    <img src="images/utf_listing_item-01.jpg" alt="" />
                    <span class="tag"
                      ><i class="im im-icon-Chef-Hat"></i> Restaurant</span
                    >
                    <span class="featured_tag">Featured</span>
                    <span class="utf_open_now">Open Now</span>
                    <div class="utf_listing_item_content">
                      <div class="utf_listing_prige_block">
                        <span class="utf_meta_listing_price"
                          ><i class="fa fa-tag"></i> $25 - $55</span
                        >
                        <span class="utp_approve_item"
                          ><i class="utf_approve_listing"></i
                        ></span>
                      </div>
                      <h3>Chontaduro Barcelona</h3>
                      <span
                        ><i class="fa fa-map-marker"></i> The Ritz-Carlton, Hong
                        Kong</span
                      >
                      <span
                        ><i class="fa fa-phone"></i> (+15) 124-796-3633</span
                      >
                    </div>
                  </div>
                  <div class="utf_star_rating_section" data-rating="4.5">
                    <div class="utf_counter_star_rating">(4.5)</div>
                    <span class="utf_view_count"
                      ><i class="fa fa-eye"></i> 822+</span
                    >
                    <span class="like-icon"></span>
                  </div>
                </a>
              </div>

              <div class="utf_carousel_item">
                <a
                  href="listings_single_page_1.html"
                  class="utf_listing_item-container compact"
                >
                  <div class="utf_listing_item">
                    <img src="images/utf_listing_item-02.jpg" alt="" />
                    <span class="tag"
                      ><i class="im im-icon-Electric-Guitar"></i> Events</span
                    >
                    <div class="utf_listing_item_content">
                      <div class="utf_listing_prige_block">
                        <span class="utf_meta_listing_price"
                          ><i class="fa fa-tag"></i> $45 - $70</span
                        >
                      </div>
                      <h3>The Lounge & Bar</h3>
                      <span
                        ><i class="fa fa-map-marker"></i> The Ritz-Carlton, Hong
                        Kong</span
                      >
                      <span
                        ><i class="fa fa-phone"></i> (+15) 124-796-3633</span
                      >
                    </div>
                  </div>
                  <div class="utf_star_rating_section" data-rating="4.5">
                    <div class="utf_counter_star_rating">(4.5)</div>
                    <span class="utf_view_count"
                      ><i class="fa fa-eye"></i> 822+</span
                    >
                    <span class="like-icon"></span>
                  </div>
                </a>
              </div>

              <div class="utf_carousel_item">
                <a
                  href="listings_single_page_1.html"
                  class="utf_listing_item-container compact"
                >
                  <div class="utf_listing_item">
                    <img src="images/utf_listing_item-03.jpg" alt="" />
                    <span class="tag"
                      ><i class="im im-icon-Hotel"></i> Hotels</span
                    >
                    <span class="utf_closed">Closed</span>
                    <div class="utf_listing_item_content">
                      <div class="utf_listing_prige_block">
                        <span class="utf_meta_listing_price"
                          ><i class="fa fa-tag"></i> $25 - $55</span
                        >
                      </div>
                      <h3>Westfield Sydney</h3>
                      <span
                        ><i class="fa fa-map-marker"></i> The Ritz-Carlton, Hong
                        Kong</span
                      >
                      <span
                        ><i class="fa fa-phone"></i> (+15) 124-796-3633</span
                      >
                    </div>
                  </div>
                  <div class="utf_star_rating_section" data-rating="4.5">
                    <div class="utf_counter_star_rating">(4.5)</div>
                    <span class="utf_view_count"
                      ><i class="fa fa-eye"></i> 822+</span
                    >
                    <span class="like-icon"></span>
                  </div>
                </a>
              </div>

              <div class="utf_carousel_item">
                <a
                  href="listings_single_page_1.html"
                  class="utf_listing_item-container compact"
                >
                  <div class="utf_listing_item">
                    <img src="images/utf_listing_item-04.jpg" alt="" />
                    <span class="tag"
                      ><i class="im im-icon-Dumbbell"></i> Fitness</span
                    >
                    <div class="utf_listing_item_content">
                      <div class="utf_listing_prige_block">
                        <span class="utf_meta_listing_price"
                          ><i class="fa fa-tag"></i> $45 - $70</span
                        >
                        <span class="utp_approve_item"
                          ><i class="utf_approve_listing"></i
                        ></span>
                      </div>
                      <h3>Ruby Beauty Center</h3>
                      <span
                        ><i class="fa fa-map-marker"></i> The Ritz-Carlton, Hong
                        Kong</span
                      >
                      <span
                        ><i class="fa fa-phone"></i> (+15) 124-796-3633</span
                      >
                    </div>
                  </div>
                  <div class="utf_star_rating_section" data-rating="4.5">
                    <div class="utf_counter_star_rating">(4.5)</div>
                    <span class="utf_view_count"
                      ><i class="fa fa-eye"></i> 822+</span
                    >
                    <span class="like-icon"></span>
                  </div>
                </a>
              </div>

              <div class="utf_carousel_item">
                <a
                  href="listings_single_page_1.html"
                  class="utf_listing_item-container compact"
                >
                  <div class="utf_listing_item">
                    <img src="images/utf_listing_item-05.jpg" alt="" />
                    <span class="tag"
                      ><i class="im im-icon-Hotel"></i> Hotels</span
                    >
                    <span class="featured_tag">Featured</span>
                    <span class="utf_closed">Closed</span>
                    <div class="utf_listing_item_content">
                      <div class="utf_listing_prige_block">
                        <span class="utf_meta_listing_price"
                          ><i class="fa fa-tag"></i> $45 - $70</span
                        >
                      </div>
                      <h3>UK Fitness Club</h3>
                      <span
                        ><i class="fa fa-map-marker"></i> The Ritz-Carlton, Hong
                        Kong</span
                      >
                      <span
                        ><i class="fa fa-phone"></i> (+15) 124-796-3633</span
                      >
                    </div>
                  </div>
                  <div class="utf_star_rating_section" data-rating="4.5">
                    <div class="utf_counter_star_rating">(4.5)</div>
                    <span class="utf_view_count"
                      ><i class="fa fa-eye"></i> 822+</span
                    >
                    <span class="like-icon"></span>
                  </div>
                </a>
              </div>

              <div class="utf_carousel_item">
                <a
                  href="listings_single_page_1.html"
                  class="utf_listing_item-container compact"
                >
                  <div class="utf_listing_item">
                    <img src="images/utf_listing_item-06.jpg" alt="" />
                    <span class="tag"
                      ><i class="im im-icon-Chef-Hat"></i> Restaurant</span
                    >
                    <span class="utf_open_now">Open Now</span>
                    <div class="utf_listing_item_content">
                      <div class="utf_listing_prige_block">
                        <span class="utf_meta_listing_price"
                          ><i class="fa fa-tag"></i> $25 - $45</span
                        >
                        <span class="utp_approve_item"
                          ><i class="utf_approve_listing"></i
                        ></span>
                      </div>
                      <h3>Fairmont Pacific Rim</h3>
                      <span
                        ><i class="fa fa-map-marker"></i> The Ritz-Carlton, Hong
                        Kong</span
                      >
                      <span
                        ><i class="fa fa-phone"></i> (+15) 124-796-3633</span
                      >
                    </div>
                  </div>
                  <div class="utf_star_rating_section" data-rating="4.5">
                    <div class="utf_counter_star_rating">(4.5)</div>
                    <span class="utf_view_count"
                      ><i class="fa fa-eye"></i> 822+</span
                    >
                    <span class="like-icon"></span>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <a
    href="listings_grid_full_width.html"
    class="flip-banner parallax"
    data-background="images/slider-bg-02.jpg"
    data-color="#000"
    data-color-opacity="0.85"
    data-img-width="2500"
    data-img-height="1666"
  >
    <div class="flip-banner-content">
      <h2 class="flip-visible">Browse Listings Attractions List</h2>
    </div>
  </a>

  <section
    class="utf_testimonial_part fullwidth_block padding-top-75 padding-bottom-75"
  >
    <div class="container">
      <div class="row">
        <div class="col-md-8 col-md-offset-2">
          <h3 class="headline_part centered">
            What Say Our Customers
            <span class="margin-top-15"
              >Lorem Ipsum is simply dummy text of the printing and type setting
              industry. Lorem Ipsum has been the industrs standard dummy text
              ever since...</span
            >
          </h3>
        </div>
      </div>
    </div>
    <div class="fullwidth_carousel_container_block margin-top-20">
      <div class="utf_testimonial_carousel testimonials">
        <div class="utf_carousel_review_part">
          <div class="utf_testimonial_box">
            <div class="testimonial">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
              in pulvinar neque. Nulla finibus lobortis pulvinar. Donec a
              consectetur nulla. Nulla posuere sapien vitae lectus suscipit, et
              pulvinar nisi tincidunt. Aliquam erat volutpat. Curabitur
              convallis fringilla diam sed aliquam. Sed tempor iaculis massa
              faucibus feugiat. In fermentum facilisis massa, a consequat purus
              viverra.
            </div>
          </div>
          <div class="utf_testimonial_author">
            <img src="images/happy-client-01.jpg" alt="" />
            <h4>Denwen Evil <span>Web Developer</span></h4>
          </div>
        </div>
        <div class="utf_carousel_review_part">
          <div class="utf_testimonial_box">
            <div class="testimonial">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
              in pulvinar neque. Nulla finibus lobortis pulvinar. Donec a
              consectetur nulla. Nulla posuere sapien vitae lectus suscipit, et
              pulvinar nisi tincidunt. Aliquam erat volutpat. Curabitur
              convallis fringilla diam sed aliquam. Sed tempor iaculis massa
              faucibus feugiat. In fermentum facilisis massa, a consequat purus
              viverra.
            </div>
          </div>
          <div class="utf_testimonial_author">
            <img src="images/happy-client-02.jpg" alt="" />
            <h4>Adam Alloriam <span>Web Developer</span></h4>
          </div>
        </div>
        <div class="utf_carousel_review_part">
          <div class="utf_testimonial_box">
            <div class="testimonial">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
              in pulvinar neque. Nulla finibus lobortis pulvinar. Donec a
              consectetur nulla. Nulla posuere sapien vitae lectus suscipit, et
              pulvinar nisi tincidunt. Aliquam erat volutpat. Curabitur
              convallis fringilla diam sed aliquam. Sed tempor iaculis massa
              faucibus feugiat. In fermentum facilisis massa, a consequat purus
              viverra.
            </div>
          </div>
          <div class="utf_testimonial_author">
            <img src="images/happy-client-03.jpg" alt="" />
            <h4>Illa Millia <span>Project Manager</span></h4>
          </div>
        </div>
        <div class="utf_carousel_review_part">
          <div class="utf_testimonial_box">
            <div class="testimonial"></div>
          </div>
          <div class="utf_testimonial_author">
            <img src="images/happy-client-01.jpg" alt="" />
            <h4>Denwen Evil <span>Web Developer</span></h4>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section
    class="fullwidth_block padding-top-75 padding-bottom-75"
    data-background-color="#ffffff"
  >
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <h3 class="headline_part centered margin-bottom-50">
            Letest Tips & Blog<span
              >Discover & connect with top-rated local businesses</span
            >
          </h3>
        </div>
      </div>
      <div class="row">
        <div class="col-md-3 col-sm-6 col-xs-12">
          <a href="blog_detail_post.html" class="blog_compact_part-container">
            <div class="blog_compact_part">
              <img src="images/blog-compact-post-01.jpg" alt="" />
              <div class="blog_compact_part_content">
                <h3>The Most Popular New top Places Listing</h3>
                <ul class="blog_post_tag_part">
                  <li>22 January 2021</li>
                </ul>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor
                </p>
              </div>
            </div>
          </a>
        </div>

        <div class="col-md-3 col-sm-6 col-xs-12">
          <a href="blog_detail_post.html" class="blog_compact_part-container">
            <div class="blog_compact_part">
              <img src="images/blog-compact-post-02.jpg" alt="" />
              <div class="blog_compact_part_content">
                <h3>Greatest Event Places in Listing</h3>
                <ul class="blog_post_tag_part">
                  <li>18 January 2021</li>
                </ul>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor
                </p>
              </div>
            </div>
          </a>
        </div>

        <div class="col-md-3 col-sm-6 col-xs-12">
          <a href="blog_detail_post.html" class="blog_compact_part-container">
            <div class="blog_compact_part">
              <img src="images/blog-compact-post-03.jpg" alt="" />
              <div class="blog_compact_part_content">
                <h3>Top 15 Greatest Ideas for Health & Body</h3>
                <ul class="blog_post_tag_part">
                  <li>10 January 2021</li>
                </ul>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor
                </p>
              </div>
            </div>
          </a>
        </div>

        <div class="col-md-3 col-sm-6 col-xs-12">
          <a href="blog_detail_post.html" class="blog_compact_part-container">
            <div class="blog_compact_part">
              <img src="images/blog-compact-post-04.jpg" alt="" />
              <div class="blog_compact_part_content">
                <h3>Top 10 Best Clothing Shops in Sydney</h3>
                <ul class="blog_post_tag_part">
                  <li>18 January 2021</li>
                </ul>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor
                </p>
              </div>
            </div>
          </a>
        </div>
        <div class="col-md-12 centered_content">
          <a href="blog_page.html" class="button border margin-top-20"
            >View More Blog</a
          >
        </div>
      </div>
    </div>
  </section>

  <section
    class="fullwidth_block margin-bottom-0 padding-top-50 padding-bottom-50"
    data-background-color="linear-gradient(to bottom, #f9f9f9 0%, rgba(255, 255, 255, 1))"
  >
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="companie-logo-slick-carousel utf_dots_nav">
            <div class="item">
              <img src="images/brand_logo_01.png" alt="" />
            </div>
            <div class="item">
              <img src="images/brand_logo_02.png" alt="" />
            </div>
            <div class="item">
              <img src="images/brand_logo_03.png" alt="" />
            </div>
            <div class="item">
              <img src="images/brand_logo_04.png" alt="" />
            </div>
            <div class="item">
              <img src="images/brand_logo_05.png" alt="" />
            </div>
            <div class="item">
              <img src="images/brand_logo_06.png" alt="" />
            </div>
            <div class="item">
              <img src="images/brand_logo_07.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <div id="bottom_backto_top"><a href="#"></a></div>
</template>