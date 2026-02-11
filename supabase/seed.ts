
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!; // Prefer service role for admin tasks

if (!process.env.SERVICE_ROLE_KEY) {
    console.warn("WARNING: Using ANON KEY for seeding. This might fail if RLS policies are strict. Please provide SERVICE_ROLE_KEY in .env.local for full access.");
}

const supabase = createClient(supabaseUrl, supabaseKey);

const menuData = [
    {
        id: "indian",
        name: "Indian Cuisine",
        tagline: "The soul of tradition, the heart of flavor",
        icon_name: "Flame",
        subCategories: [
            {
                name: "Starters & Appetizers",
                dishes: [
                    { name: "Paneer Tikka", description: "Cottage cheese marinated in aromatic spices, grilled to perfection", dietary: ["veg"] },
                    { name: "Tandoori Chicken", description: "Clay oven roasted chicken with traditional spice blend", dietary: ["non-veg"] },
                    { name: "Hara Bhara Kabab", description: "Spinach and green pea patties with mint chutney", dietary: ["veg", "vegan"] },
                    { name: "Aloo Tikki Chaat", description: "Spiced potato patties with tangy chutneys", dietary: ["veg"] },
                    { name: "Dahi Puri", description: "Crispy shells filled with yogurt, chutneys, and spices", dietary: ["veg"] },
                    { name: "Samosa", description: "Crispy pastry filled with spiced potatoes and peas", dietary: ["veg", "vegan"] },
                    { name: "Pakora Platter", description: "Assorted vegetable fritters with mint chutney", dietary: ["veg", "vegan"] },
                ],
            },
            {
                name: "Main Course - Vegetarian",
                dishes: [
                    { name: "Paneer Butter Masala", description: "Cottage cheese in rich tomato-cream gravy", dietary: ["veg"] },
                    { name: "Dal Makhani", description: "Black lentils slow-cooked with butter and cream", dietary: ["veg"] },
                    { name: "Palak Paneer", description: "Cottage cheese in creamy spinach gravy", dietary: ["veg"] },
                    { name: "Veg Kolhapuri", description: "Mixed vegetables in spicy Kolhapuri gravy", dietary: ["veg"], spiceLevel: 3 },
                    { name: "Bhindi Masala", description: "Okra cooked with onions and aromatic spices", dietary: ["veg", "vegan"] },
                    { name: "Aloo Gobi", description: "Potato and cauliflower dry curry", dietary: ["veg", "vegan"] },
                    { name: "Chole Bhature", description: "Spiced chickpeas with deep-fried bread", dietary: ["veg"] },
                    { name: "Rajma Masala", description: "Red kidney beans in thick tomato gravy", dietary: ["veg", "vegan"] },
                ],
            },
            {
                name: "Main Course - Non-Vegetarian",
                dishes: [
                    { name: "Butter Chicken", description: "Tender chicken in creamy tomato sauce", dietary: ["non-veg"] },
                    { name: "Chicken Tikka Masala", description: "Grilled chicken in spiced curry", dietary: ["non-veg"] },
                    { name: "Mutton Rogan Josh", description: "Aromatic lamb curry from Kashmir", dietary: ["non-veg"], spiceLevel: 2 },
                    { name: "Fish Curry", description: "Fresh fish in coastal-style curry", dietary: ["non-veg"] },
                    { name: "Chicken Biryani", description: "Fragrant rice layered with marinated chicken", dietary: ["non-veg"] },
                    { name: "Mutton Biryani", description: "Aromatic rice with tender mutton pieces", dietary: ["non-veg"] },
                ],
            },
            {
                name: "Breads & Rice",
                dishes: [
                    { name: "Butter Naan", description: "Soft leavened bread brushed with butter", dietary: ["veg"] },
                    { name: "Garlic Naan", description: "Naan topped with garlic and herbs", dietary: ["veg"] },
                    { name: "Tandoori Roti", description: "Whole wheat bread from clay oven", dietary: ["veg", "vegan"] },
                    { name: "Laccha Paratha", description: "Layered flaky flatbread", dietary: ["veg"] },
                    { name: "Jeera Rice", description: "Basmati rice tempered with cumin", dietary: ["veg", "vegan"] },
                    { name: "Veg Pulao", description: "Fragrant rice with mixed vegetables", dietary: ["veg", "vegan"] },
                ],
            },
        ],
    },
    {
        id: "mughlai",
        name: "Mughlai Cuisine",
        tagline: "Royal flavors from the Mughal kitchens",
        icon_name: "Crown",
        subCategories: [
            {
                name: "Starters",
                dishes: [
                    { name: "Galouti Kebab", description: "Melt-in-mouth minced lamb kebabs", dietary: ["non-veg"] },
                    { name: "Seekh Kebab", description: "Spiced minced meat skewers", dietary: ["non-veg"] },
                    { name: "Reshmi Kebab", description: "Silky smooth chicken kebabs", dietary: ["non-veg"] },
                    { name: "Shami Kebab", description: "Minced meat and lentil patties", dietary: ["non-veg"] },
                ],
            },
            {
                name: "Main Course",
                dishes: [
                    { name: "Mughlai Chicken", description: "Rich chicken curry with cream and nuts", dietary: ["non-veg"] },
                    { name: "Nihari", description: "Slow-cooked mutton stew with aromatic spices", dietary: ["non-veg"] },
                    { name: "Korma", description: "Meat or vegetables in creamy nut-based gravy", dietary: ["non-veg"] },
                    { name: "Shahi Paneer", description: "Cottage cheese in royal cashew gravy", dietary: ["veg"] },
                    { name: "Dum Aloo Banarasi", description: "Stuffed baby potatoes in rich gravy", dietary: ["veg"] },
                    { name: "Hyderabadi Biryani", description: "Layered rice with meat and saffron", dietary: ["non-veg"] },
                ],
            },
            {
                name: "Breads",
                dishes: [
                    { name: "Sheermal", description: "Sweet saffron flatbread", dietary: ["veg"] },
                    { name: "Roomali Roti", description: "Thin handkerchief bread", dietary: ["veg", "vegan"] },
                    { name: "Khameeri Roti", description: "Leavened bread with mild sweetness", dietary: ["veg"] },
                ],
            },
        ],
    },
    {
        id: "chinese",
        name: "Chinese Cuisine",
        tagline: "Indo-Chinese fusion and authentic flavors",
        icon_name: "Soup",
        subCategories: [
            {
                name: "Starters",
                dishes: [
                    { name: "Veg Manchurian", description: "Crispy vegetable balls in tangy sauce", dietary: ["veg", "vegan"] },
                    { name: "Chicken Manchurian", description: "Crispy chicken in tangy Indo-Chinese sauce", dietary: ["non-veg"] },
                    { name: "Spring Rolls", description: "Crispy rolls with vegetable filling", dietary: ["veg", "vegan"] },
                    { name: "Chilli Paneer", description: "Cottage cheese with bell peppers in spicy sauce", dietary: ["veg"], spiceLevel: 2 },
                    { name: "Chilli Chicken", description: "Crispy chicken in Indo-Chinese sauce", dietary: ["non-veg"], spiceLevel: 2 },
                    { name: "Honey Chilli Potato", description: "Crispy potatoes in sweet-spicy glaze", dietary: ["veg"] },
                    { name: "Drums of Heaven", description: "Lollipop chicken wings", dietary: ["non-veg"] },
                    { name: "Veg Momos", description: "Steamed dumplings with vegetable filling", dietary: ["veg", "vegan"] },
                    { name: "Chicken Momos", description: "Steamed dumplings with chicken filling", dietary: ["non-veg"] },
                ],
            },
            {
                name: "Main Course",
                dishes: [
                    { name: "Veg Hakka Noodles", description: "Stir-fried noodles with vegetables", dietary: ["veg", "vegan"] },
                    { name: "Chicken Hakka Noodles", description: "Stir-fried noodles with chicken", dietary: ["non-veg"] },
                    { name: "Veg Fried Rice", description: "Wok-tossed rice with vegetables", dietary: ["veg", "vegan"] },
                    { name: "Chicken Fried Rice", description: "Wok-tossed rice with chicken", dietary: ["non-veg"] },
                    { name: "American Chopsuey", description: "Crispy noodles with sweet-tangy sauce", dietary: ["veg"] },
                    { name: "Burnt Garlic Rice", description: "Aromatic garlic-infused rice", dietary: ["veg", "vegan"] },
                    { name: "Schezwan Noodles", description: "Spicy Schezwan style noodles", dietary: ["veg"], spiceLevel: 3 },
                    { name: "Singapore Noodles", description: "Curry-flavored rice noodles", dietary: ["veg"] },
                ],
            },
            {
                name: "Gravies",
                dishes: [
                    { name: "Mixed Vegetables in Hot Garlic Sauce", description: "Assorted vegetables in spicy garlic gravy", dietary: ["veg", "vegan"], spiceLevel: 2 },
                    { name: "Chicken in Black Bean Sauce", description: "Tender chicken in fermented black bean sauce", dietary: ["non-veg"] },
                    { name: "Paneer in Schezwan Sauce", description: "Cottage cheese in fiery Schezwan gravy", dietary: ["veg"], spiceLevel: 3 },
                ],
            },
        ],
    },
    {
        id: "continental",
        name: "Continental Cuisine",
        tagline: "European elegance on your plate",
        icon_name: "Wine",
        subCategories: [
            {
                name: "Starters",
                dishes: [
                    { name: "Bruschetta", description: "Toasted bread with tomato-basil topping", dietary: ["veg", "vegan"] },
                    { name: "Garlic Bread with Cheese", description: "Toasted bread with garlic butter and cheese", dietary: ["veg"] },
                    { name: "Stuffed Mushrooms", description: "Button mushrooms with herb filling", dietary: ["veg"] },
                    { name: "Chicken Wings", description: "BBQ or Buffalo style wings", dietary: ["non-veg"] },
                    { name: "Tomato Soup", description: "Classic creamy tomato soup", dietary: ["veg"] },
                    { name: "Mushroom Soup", description: "Earthy cream of mushroom soup", dietary: ["veg"] },
                ],
            },
            {
                name: "Main Course",
                dishes: [
                    { name: "Pasta Alfredo", description: "Creamy parmesan pasta", dietary: ["veg"] },
                    { name: "Pasta Arrabiata", description: "Spicy tomato sauce pasta", dietary: ["veg", "vegan"], spiceLevel: 2 },
                    { name: "Pasta Pesto", description: "Fresh basil pesto pasta", dietary: ["veg"] },
                    { name: "Aglio e Olio", description: "Garlic and olive oil spaghetti", dietary: ["veg", "vegan"] },
                    { name: "Lasagna", description: "Layered pasta with meat or vegetables", dietary: ["veg"] },
                    { name: "Risotto", description: "Creamy Italian rice", dietary: ["veg"] },
                    { name: "Grilled Chicken Steak", description: "Herb-marinated chicken with vegetables", dietary: ["non-veg"] },
                    { name: "Fish Fillet", description: "Pan-seared or grilled fish", dietary: ["non-veg"] },
                ],
            },
            {
                name: "Sides",
                dishes: [
                    { name: "Mashed Potatoes", description: "Creamy buttered potatoes", dietary: ["veg"] },
                    { name: "French Fries", description: "Crispy golden potato fries", dietary: ["veg", "vegan"] },
                    { name: "Sautéed Vegetables", description: "Seasonal vegetables in garlic butter", dietary: ["veg"] },
                    { name: "Garden Salad", description: "Fresh mixed greens with dressing", dietary: ["veg", "vegan"] },
                ],
            },
        ],
    },
    {
        id: "indonesian",
        name: "Indonesian Cuisine",
        tagline: "Exotic island flavors",
        icon_name: "Globe",
        subCategories: [
            {
                name: "Main Dishes",
                dishes: [
                    { name: "Nasi Goreng", description: "Indonesian fried rice with sweet soy", dietary: ["veg"] },
                    { name: "Mie Goreng", description: "Indonesian fried noodles", dietary: ["veg"] },
                    { name: "Rendang", description: "Slow-cooked beef in coconut curry", dietary: ["non-veg"], spiceLevel: 2 },
                    { name: "Satay", description: "Grilled skewered meat with peanut sauce", dietary: ["non-veg"] },
                    { name: "Gado-Gado", description: "Vegetable salad with peanut dressing", dietary: ["veg", "vegan"] },
                    { name: "Soto Ayam", description: "Aromatic chicken soup with turmeric", dietary: ["non-veg"] },
                    { name: "Ayam Bakar", description: "Grilled chicken with sweet soy glaze", dietary: ["non-veg"] },
                ],
            },
        ],
    },
    {
        id: "mexican",
        name: "Mexican Cuisine",
        tagline: "Fiesta of vibrant flavors",
        icon_name: "Leaf",
        subCategories: [
            {
                name: "Starters & Mains",
                dishes: [
                    { name: "Nachos Supreme", description: "Tortilla chips with cheese and toppings", dietary: ["veg"] },
                    { name: "Quesadillas", description: "Grilled tortillas with cheese filling", dietary: ["veg"] },
                    { name: "Tacos", description: "Soft/hard shell with choice of fillings", dietary: ["veg"] },
                    { name: "Burritos", description: "Wrapped tortillas with rice, beans, protein", dietary: ["veg"] },
                    { name: "Enchiladas", description: "Rolled tortillas with sauce and cheese", dietary: ["veg"] },
                    { name: "Fajitas", description: "Sizzling vegetables and protein", dietary: ["veg"] },
                    { name: "Mexican Rice", description: "Tomato-flavored rice with spices", dietary: ["veg", "vegan"] },
                ],
            },
            {
                name: "Accompaniments",
                dishes: [
                    { name: "Salsa", description: "Fresh tomato salsa - mild to hot", dietary: ["veg", "vegan"] },
                    { name: "Guacamole", description: "Creamy avocado dip", dietary: ["veg", "vegan"] },
                    { name: "Sour Cream", description: "Cool cream accompaniment", dietary: ["veg"] },
                    { name: "Refried Beans", description: "Creamy seasoned beans", dietary: ["veg", "vegan"] },
                ],
            },
        ],
    },
    {
        id: "appetizers",
        name: "Appetizers & Platters",
        tagline: "Perfect starters for every occasion",
        icon_name: "Soup",
        subCategories: [
            {
                name: "Vegetarian Platters",
                dishes: [
                    { name: "Mediterranean Platter", description: "Hummus, falafel, pita, olives", dietary: ["veg", "vegan"] },
                    { name: "Indian Starter Platter", description: "Assorted kababs and tikkas", dietary: ["veg"] },
                    { name: "Cheese & Crackers Board", description: "Selection of artisan cheeses", dietary: ["veg"] },
                    { name: "Bruschetta Platter", description: "Various topped toasts", dietary: ["veg"] },
                    { name: "Crudité Platter", description: "Fresh vegetables with dips", dietary: ["veg", "vegan"] },
                ],
            },
            {
                name: "Non-Vegetarian Platters",
                dishes: [
                    { name: "Grilled Meat Platter", description: "Assorted grilled meats", dietary: ["non-veg"] },
                    { name: "Seafood Platter", description: "Mix of fish, prawns, calamari", dietary: ["non-veg"] },
                    { name: "Chicken Wings Platter", description: "Multiple flavors and sauces", dietary: ["non-veg"] },
                    { name: "BBQ Platter", description: "Smoked and grilled selections", dietary: ["non-veg"] },
                ],
            },
            {
                name: "Finger Foods",
                dishes: [
                    { name: "Mini Burgers/Sliders", description: "Bite-sized gourmet burgers", dietary: ["veg"] },
                    { name: "Chicken Nuggets", description: "Crispy breaded chicken bites", dietary: ["non-veg"] },
                    { name: "Fish Fingers", description: "Crispy battered fish strips", dietary: ["non-veg"] },
                    { name: "Vegetable Cutlets", description: "Spiced vegetable patties", dietary: ["veg"] },
                    { name: "Cheese Balls", description: "Golden fried cheese bites", dietary: ["veg"] },
                ],
            },
        ],
    },
    {
        id: "south-indian",
        name: "South Indian Cuisine",
        tagline: "Authentic flavors from the southern coast",
        icon_name: "Coffee",
        subCategories: [
            {
                name: "Breakfast Items",
                dishes: [
                    { name: "Idli", description: "Steamed rice cakes with sambar and chutney", dietary: ["veg", "vegan"] },
                    { name: "Plain Dosa", description: "Crispy rice and lentil crepe", dietary: ["veg", "vegan"] },
                    { name: "Masala Dosa", description: "Dosa filled with spiced potato", dietary: ["veg", "vegan"] },
                    { name: "Rava Dosa", description: "Crispy semolina crepe", dietary: ["veg"] },
                    { name: "Medu Vada", description: "Crispy lentil fritters", dietary: ["veg", "vegan"] },
                    { name: "Upma", description: "Semolina preparation with vegetables", dietary: ["veg"] },
                    { name: "Uttapam", description: "Thick rice pancake with toppings", dietary: ["veg", "vegan"] },
                    { name: "Pongal", description: "Rice and lentil comfort food", dietary: ["veg"] },
                ],
            },
            {
                name: "Main Course",
                dishes: [
                    { name: "Sambar", description: "Lentil-based vegetable stew", dietary: ["veg", "vegan"] },
                    { name: "Rasam", description: "Tangy tamarind soup with spices", dietary: ["veg", "vegan"] },
                    { name: "Avial", description: "Mixed vegetables in coconut-yogurt gravy", dietary: ["veg"] },
                    { name: "Kootu", description: "Vegetables with lentils and coconut", dietary: ["veg", "vegan"] },
                    { name: "Chettinad Chicken", description: "Spicy Tamil Nadu style chicken", dietary: ["non-veg"], spiceLevel: 3 },
                    { name: "Fish Moilee", description: "Kerala-style fish in coconut curry", dietary: ["non-veg"] },
                ],
            },
        ],
    },
    {
        id: "desserts",
        name: "Desserts",
        tagline: "Sweet endings to cherish",
        icon_name: "IceCream",
        subCategories: [
            {
                name: "Indian Sweets",
                dishes: [
                    { name: "Gulab Jamun", description: "Deep-fried milk dumplings in sugar syrup", dietary: ["veg"] },
                    { name: "Rasgulla", description: "Spongy cottage cheese balls in syrup", dietary: ["veg"] },
                    { name: "Rasmalai", description: "Cottage cheese patties in saffron milk", dietary: ["veg"] },
                    { name: "Jalebi", description: "Crispy spiral sweets in saffron syrup", dietary: ["veg"] },
                    { name: "Kheer", description: "Creamy rice pudding with nuts", dietary: ["veg"] },
                    { name: "Gajar Ka Halwa", description: "Warm carrot pudding with nuts", dietary: ["veg"] },
                    { name: "Moong Dal Halwa", description: "Rich lentil pudding", dietary: ["veg"] },
                ],
            },
            {
                name: "Continental Desserts",
                dishes: [
                    { name: "Tiramisu", description: "Italian coffee-flavored dessert", dietary: ["veg"] },
                    { name: "Panna Cotta", description: "Italian cream dessert", dietary: ["veg"] },
                    { name: "Crème Brûlée", description: "Caramelized custard dessert", dietary: ["veg"] },
                    { name: "Chocolate Mousse", description: "Rich and airy chocolate dessert", dietary: ["veg"] },
                    { name: "Cheesecake", description: "Creamy baked cheesecake", dietary: ["veg"] },
                    { name: "Fruit Trifle", description: "Layered fruit and cream dessert", dietary: ["veg"] },
                    { name: "Brownies", description: "Rich chocolate brownies", dietary: ["veg"] },
                ],
            },
        ],
    },
    {
        id: "beverages",
        name: "Beverages",
        tagline: "Refreshing selections",
        icon_name: "GlassWater",
        subCategories: [
            {
                name: "Fresh Juices & Mocktails",
                dishes: [
                    { name: "Fresh Juice Bar", description: "Seasonal fruit juice selections", dietary: ["veg", "vegan"] },
                    { name: "Virgin Mojito", description: "Refreshing mint and lime mocktail", dietary: ["veg", "vegan"] },
                    { name: "Blue Lagoon", description: "Citrus blue curaçao mocktail", dietary: ["veg", "vegan"] },
                    { name: "Shirley Temple", description: "Sweet ginger ale with grenadine", dietary: ["veg", "vegan"] },
                ],
            },
            {
                name: "Traditional Drinks",
                dishes: [
                    { name: "Sweet Lassi", description: "Creamy yogurt drink", dietary: ["veg"] },
                    { name: "Mango Lassi", description: "Yogurt blended with mango", dietary: ["veg"] },
                    { name: "Masala Chai", description: "Spiced Indian tea", dietary: ["veg"] },
                    { name: "Filter Coffee", description: "South Indian style coffee", dietary: ["veg"] },
                    { name: "Aam Panna", description: "Raw mango cooler", dietary: ["veg", "vegan"] },
                    { name: "Jaljeera", description: "Tangy cumin drink", dietary: ["veg", "vegan"] },
                    { name: "Rooh Afza", description: "Rose-flavored sweet drink", dietary: ["veg", "vegan"] },
                    { name: "Fresh Lime Soda", description: "Sweet or salted lime soda", dietary: ["veg", "vegan"] },
                ],
            },
        ],
    },
];

async function seed() {
    console.log("Starting seed process...");

    // 1. Create Admin User
    const adminEmail = 'curiousmugnoida@gmail.com';
    const adminPassword = 'JustSmile98@$$';

    console.log(`Creating/Updating admin user: ${adminEmail}`);

    // Try to sign up, if user exists, it will fail but that's fine, we then try to sign in
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email: adminEmail,
        password: adminPassword,
    });

    if (signUpError) {
        console.log(`Sign up info: ${signUpError.message}`);
    } else {
        console.log(`Admin user created: ${signUpData.user?.id}`);
    }

    // 2. Clear existing menu data (optional, but good for idempotency)
    // Be careful in production. For now, we will delete all rows.
    // We rely on cascade delete to clean up subcategories and items.
    const { error: deleteError } = await supabase.from('menu_cuisines').delete().neq("slug", "non_existent_slug_to_delete_all");
    // Actually, to delete all, we can filter by something that is always true or not filter at all if policies allow.
    // Assuming RLS allows delete for authenticated (which we are not fully here if using Anon key without service role, but let's try).
    // Better approach: Check if data exists, if so skip or update.
    // For this task "Add all existing menu items", we want to ensure they are there.
    // Let's upsert based on slug for cuisines.

    for (const [cBodyIndex, cuisine] of menuData.entries()) {
        console.log(`Processing cuisine: ${cuisine.name}`);

        // Insert/Update Cuisine
        const { data: cuisineData, error: cuisineError } = await supabase
            .from('menu_cuisines')
            .upsert({
                slug: cuisine.id,
                name: cuisine.name,
                tagline: cuisine.tagline,
                icon_name: cuisine.icon_name,
                sort_order: cBodyIndex
            }, { onConflict: 'slug' })
            .select()
            .single();

        if (cuisineError) {
            console.error(`Error inserting cuisine ${cuisine.name}:`, cuisineError);
            continue;
        }

        if (!cuisineData) continue;
        const cuisineId = cuisineData.id;

        // Process Subcategories
        for (const [subIndex, sub] of cuisine.subCategories.entries()) {
            // We don't have a unique slug for subcategories in the source, so we might duplicate if we run multiple times.
            // To avoid duplicates without a unique key, we can delete existing subcategories for this cuisine first?
            // Or we can try to find it first.

            // Let's try to find existing by name and cuisine_id
            const { data: existingSub } = await supabase
                .from('menu_subcategories')
                .select('id')
                .eq('cuisine_id', cuisineId)
                .eq('name', sub.name)
                .single();

            let subId = existingSub?.id;

            if (!subId) {
                const { data: newSub, error: subError } = await supabase
                    .from('menu_subcategories')
                    .insert({
                        cuisine_id: cuisineId,
                        name: sub.name,
                        sort_order: subIndex
                    })
                    .select()
                    .single();

                if (subError) {
                    console.error(`Error inserting subcategory ${sub.name}:`, subError);
                    continue;
                }
                subId = newSub.id;
            } else {
                // Update sort order
                await supabase.from('menu_subcategories').update({ sort_order: subIndex }).eq('id', subId);
            }

            // Process Items
            for (const [itemIndex, item] of sub.dishes.entries()) {
                // Check if item exists
                const { data: existingItem } = await supabase
                    .from('menu_items')
                    .select('id')
                    .eq('subcategory_id', subId)
                    .eq('name', item.name)
                    .single();

                const itemPayload = {
                    subcategory_id: subId,
                    name: item.name,
                    description: item.description,
                    dietary: item.dietary,
                    spice_level: (item as any).spiceLevel || null, // Cast as any because spiceLevel is optional in source
                    sort_order: itemIndex,
                    is_available: true
                };

                if (existingItem) {
                    await supabase.from('menu_items').update(itemPayload).eq('id', existingItem.id);
                } else {
                    await supabase.from('menu_items').insert(itemPayload);
                }
            }
        }
    }

    console.log("Seed process completed.");
}

seed().catch(console.error);
