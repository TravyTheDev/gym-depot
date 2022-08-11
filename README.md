# Gym Depot

E-commerce app. Users can login, add to or delete items from their cart and make payments through Stripe. Admins can add, edit and delete products as well as manage orders through an admin page. Admins get notifications on new orders and users get notifications on delivery

**Link** https://gym-depot.herokuapp.com/

![cocktailscreenshot](https://github.com/TravyTheDev/TravyTheDev/blob/main/gym-depot-screenshot2.png?raw=true)

## How it's made:
**Tech used:** React, Node, Express, MongoDB, Bootstrap

I really wanted something with an admin page that could manage everything and a way to collect payments online. I always really wanted to try and use bootstrap for the styling. Most of my time was definitely spent getting cloudinary to work properly, especially when deleting pictures.  

### Optimizations 
1: The product descriptions need to preserve white space.

2: The payment needs to be in a pop-up modal. Writing your credit card information directly into the page is a little scary. I'd also would like to add Paypal functionality.

3: The styling for the notifications is also not the best.

4: There should be a function to reset passwords.

### Lessons Learned:
Bootstrap is so easy. It makes sense why a lot of websites look the same. Until now I had always freestyled my CSS, but I may look into using bootstrap more often. Also this folder structure is a bit lazy and hard to work with. It's much better to take a few extra seconds and put everything into it's own folder rather than digging through every file every time. 
