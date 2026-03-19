const sampleListing = [
  //electronics
    {
    "title": "iPhone 14",
    "description": "Apple smartphone with A15 chip",
    "price": 79999,
    "category": "electronics",
    "image": "https://images.unsplash.com/photo-1663314326611-9e2fd4f11b1b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aVBob25lJTIwMTR8ZW58MHx8MHx8fDA%3D",
    "stock": 10
  },
  {
    "title": "Samsung Galaxy S23",
    "description": "Flagship Android phone",
    "price": 74999,
    "category": "electronics",
    "image": "https://images.unsplash.com/photo-1709744722656-9b850470293f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8U2Ftc3VuZyUyMEdhbGF4eSUyMFMyM3xlbnwwfHwwfHx8MA%3D%3D",
    "stock": 8
  },
  {
    "title": "Dell Laptop",
    "description": "i5 12th Gen laptop",
    "price": 55999,
    "category": "electronics",
    "image": "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8RGVsbCUyMExhcHRvcHxlbnwwfHwwfHx8MA%3D%3D",
    "stock": 5
  },
  {
    "title": "Boat Headphones",
    "description": "Wireless over-ear headphones",
    "price": 1999,
    "category": "electronics",
    "image": "https://images.unsplash.com/photo-1662280804039-8708dd045d65?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fEJvYXQlMjBIZWFkcGhvbmVzfGVufDB8fDB8fHww",
    "stock": 25
  },
  {
    "title": "Smart Watch",
    "description": "Fitness tracking smartwatch",
    "price": 2999,
    "category": "electronics",
    "image": "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8U21hcnQlMjBXYXRjaHxlbnwwfHwwfHx8MA%3D%3D",
    "stock": 20
  },
  //clothing
  {
    "title": "Men T-Shirt",
    "description": "Cotton casual t-shirt",
    "price": 499,
    "category": "clothing",
    "image": "https://images.unsplash.com/photo-1759572095317-3a96f9a98e2b?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Q290dG9uJTIwY2FzdWFsJTIwdC1zaGlydHxlbnwwfHwwfHx8MA%3D%3D",
    "stock": 50
  },
  {
    "title": "Women Dress",
    "description": "Stylish summer dress",
    "price": 999,
    "category": "clothing",
    "image": "https://images.unsplash.com/photo-1765422794311-b4b83237648c?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fFN0eWxpc2glMjBzdW1tZXIlMjBkcmVzc3xlbnwwfHwwfHx8MA%3D%3D",
    "stock": 30
  },
  {
    "title": "Jeans",
    "description": "Slim fit denim jeans",
    "price": 1499,
    "category": "clothing",
    "image": "https://images.unsplash.com/photo-1742980511651-b845fa826f33?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fFNsaW0lMjBmaXQlMjBkZW5pbSUyMGplYW5zfGVufDB8fDB8fHww",
    "stock": 40
  },
  {
    "title": "Jacket",
    "description": "Winter warm jacket",
    "price": 2499,
    "category": "clothing",
    "image": "https://plus.unsplash.com/premium_photo-1764091967689-a6ec7a1a6964?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8V2ludGVyJTIwd2FybSUyMGphY2tldHxlbnwwfHwwfHx8MA%3D%3D",
    "stock": 20
  },
  {
    "title": "Shirt",
    "description": "Formal office shirt",
    "price": 799,
    "category": "clothing",
    "image": "https://plus.unsplash.com/premium_photo-1661515449711-ace459054f78?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzV8fEZvcm1hbCUyMG9mZmljZSUyMHNoaXJ0fGVufDB8fDB8fHww",
    "stock": 35
  },
  //footwear
  {
    "title": "Running Shoes",
    "description": "Comfortable sports shoes",
    "price": 1999,
    "category": "footwear",
    "image": "https://images.unsplash.com/photo-1562183241-b937e95585b6?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8UnVubmluZyUyMFNob2VzfGVufDB8fDB8fHww",
    "stock": 25
  },
  {
    "title": "Sneakers",
    "description": "Stylish casual sneakers",
    "price": 2499,
    "category": "footwear",
    "image": "https://images.unsplash.com/photo-1512374382149-233c42b6a83b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8U25lYWtlcnN8ZW58MHx8MHx8fDA%3D",
    "stock": 20
  },
  {
    "title": "Sandals",
    "description": "Lightweight summer sandals",
    "price": 999,
    "category": "footwear",
    "image": "https://images.unsplash.com/photo-1603487742131-4160ec999306?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8U2FuZGFsc3xlbnwwfHwwfHx8MA%3D%3D",
    "stock": 30
  },
  {
    "title": "Formal Shoes",
    "description": "Office wear shoes",
    "price": 2999,
    "category": "footwear",
    "image": "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Rm9ybWFsJTIwU2hvZXN8ZW58MHx8MHx8fDA%3D",
    "stock": 15
  },
  {
    "title": "Flip Flops",
    "description": "Casual home wear",
    "price": 299,
    "category": "footwear",
    "image": "https://images.unsplash.com/photo-1617370653117-ff3a94af6cef?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8RmxpcCUyMEZsb3BzfGVufDB8fDB8fHww",
    "stock": 50
  },
  //accessories
  {
    "title": "Leather Wallet",
    "description": "Premium wallet",
    "price": 799,
    "category": "accessories",
    "image": "https://plus.unsplash.com/premium_photo-1681589453747-53fd893fa420?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8TGVhdGhlciUyMFdhbGxldHxlbnwwfHwwfHx8MA%3D%3D",
    "stock": 40
  },
  {
    "title": "Sunglasses",
    "description": "UV protection glasses",
    "price": 999,
    "category": "accessories",
    "image": "https://plus.unsplash.com/premium_photo-1692340973681-e96b10bda346?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8U3VuZ2xhc3Nlc3xlbnwwfHwwfHx8MA%3D%3D",
    "stock": 35
  },
  {
    "title": "Backpack",
    "description": "Travel backpack",
    "price": 1499,
    "category": "accessories",
    "image": "https://plus.unsplash.com/premium_photo-1664110691115-790e20a41744?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8QmFja3BhY2t8ZW58MHx8MHx8fDA%3D",
    "stock": 25
  },
  {
    "title": "Watch",
    "description": "Analog wrist watch",
    "price": 1999,
    "category": "accessories",
    "image": "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8V2F0Y2h8ZW58MHx8MHx8fDA%3D",
    "stock": 20
  },
  {
    "title": "Belt",
    "description": "Leather belt",
    "price": 599,
    "category": "accessories",
    "image": "https://images.unsplash.com/photo-1664286074176-5206ee5dc878?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8QmVsdHxlbnwwfHwwfHx8MA%3D%3D",
    "stock": 45
  },
  //home
  {
    "title": "Wall Clock",
    "description": "Modern wall clock",
    "price": 799,
    "category": "home",
    "image": "https://plus.unsplash.com/premium_photo-1725075084045-4c1ee2ab9349?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8V2FsbCUyMGNsb2NrfGVufDB8fDB8fHww",
    "stock": 20
  },
  {
    "title": "Table Lamp",
    "description": "LED study lamp",
    "price": 1299,
    "category": "home",
    "image": "https://plus.unsplash.com/premium_photo-1681412205156-bb506a4ea970?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8VGFibGUlMjBMYW1wfGVufDB8fDB8fHww",
    "stock": 15
  },
  {
    "title": "Sofa Cover",
    "description": "Stylish sofa cover",
    "price": 999,
    "category": "home",
    "image": "https://plus.unsplash.com/premium_photo-1705843600829-15448713dcb1?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8U29mYSUyMENvdmVyfGVufDB8fDB8fHww",
    "stock": 10
  },
  {
    "title": "Curtains",
    "description": "Decorative curtains",
    "price": 1499,
    "category": "home",
    "image": "https://plus.unsplash.com/premium_photo-1668073437337-5734dc7ef812?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Q3VydGFpbnN8ZW58MHx8MHx8fDA%3D",
    "stock": 18
  },
  {
    "title": "Kitchen Set",
    "description": "Non-stick cookware set",
    "price": 2999,
    "category": "home",
    "image": "https://images.unsplash.com/photo-1539922980492-38f6673af8dd?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8S2l0Y2hlbiUyMFNldHxlbnwwfHwwfHx8MA%3D%3D",
    "stock": 12
  },
  //beauty
  {
    "title": "Face Wash",
    "description": "Gentle daily face cleanser",
    "price": 299,
    "category": "beauty",
    "image": "https://images.unsplash.com/photo-1653919198052-546d44e2458e?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8RmFjZSUyMFdhc2h8ZW58MHx8MHx8fDA%3D",
    "stock": 40
  },
  {
    "title": "Lipstick",
    "description": "Long lasting matte lipstick",
    "price": 499,
    "category": "beauty",
    "image": "https://images.unsplash.com/photo-1626895872564-b691b6877b83?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8TGlwc3RpY2t8ZW58MHx8MHx8fDA%3D",
    "stock": 30
  },
  {
    "title": "Perfume",
    "description": "Long lasting fragrance",
    "price": 1499,
    "category": "beauty",
    "image": "https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8UGVyZnVtZXxlbnwwfHwwfHx8MA%3D%3D",
    "stock": 20
  },
  {
    "title": "Moisturizer",
    "description": "Hydrating skin cream",
    "price": 399,
    "category": "beauty",
    "image": "https://images.unsplash.com/photo-1629732047847-50219e9c5aef?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8TW9pc3R1cml6ZXJ8ZW58MHx8MHx8fDA%3D",
    "stock": 35
  },
  {
    "title": "Shampoo",
    "description": "Hair care shampoo",
    "price": 349,
    "category": "beauty",
    "image": "https://images.unsplash.com/photo-1701992678972-d5a053ad0fb0?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8U2hhbXBvb3xlbnwwfHwwfHx8MA%3D%3D",
    "stock": 50
  },
  //books
  {
    "title": "The Alchemist",
    "description": "Famous novel by Paulo Coelho",
    "price": 399,
    "category": "books",
    "image": "https://images.unsplash.com/photo-1656266724452-9d5b57fb0b12?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8VGhlJTIwQWxjaGVtaXN0JTIwbm92ZWx8ZW58MHx8MHx8fDA%3D",
    "stock": 25
  },
  {
    "title": "Rich Dad Poor Dad",
    "description": "Personal finance book",
    "price": 499,
    "category": "books",
    "image": "https://images.unsplash.com/photo-1625887261583-202fb61d4446?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cmljaCUyMGRhZCUyMHBvb3IlMjBkYWQlMjBib29rfGVufDB8fDB8fHww",
    "stock": 20
  },
  {
    "title": "Atomic Habits",
    "description": "Self improvement guide",
    "price": 599,
    "category": "books",
    "image": "https://images.unsplash.com/photo-1686764288887-dae4e7d50d58?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8QXRvbWljJTIwSGFiaXRzJTIwYm9va3xlbnwwfHwwfHx8MA%3D%3D",
    "stock": 18
  },
  {
    "title": "Harry Potter",
    "description": "Fantasy novel series",
    "price": 799,
    "category": "books",
    "image": "https://images.unsplash.com/photo-1626618012641-bfbca5a31239?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8SGFycnklMjBQb3R0ZXIlMjBib29rfGVufDB8fDB8fHww",
    "stock": 22
  },
  {
    "title": "NCERT books class 10th",
    "description": "Educational textbook",
    "price": 299,
    "category": "books",
    "image": "https://plus.unsplash.com/premium_photo-1669652639337-c513cc42ead6?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Ym9va3N8ZW58MHx8MHx8fDA%3D",
    "stock": 40
  },
  //sports
  {
    "title": "Cricket Bat",
    "description": "Professional cricket bat",
    "price": 1999,
    "category": "sports",
    "image": "https://images.unsplash.com/photo-1630851278830-c0c9b12933ee?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Q3JpY2tldCUyMEJhdHxlbnwwfHwwfHx8MA%3D%3D",
    "stock": 15
  },
  {
    "title": "Football",
    "description": "Standard size football",
    "price": 799,
    "category": "sports",
    "image": "https://plus.unsplash.com/premium_photo-1677146015088-71992ac139af?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Rm9vdGJhbGx8ZW58MHx8MHx8fDA%3D",
    "stock": 25
  },
  {
    "title": "Dumbbells",
    "description": "Gym weight set",
    "price": 2499,
    "category": "sports",
    "image": "https://plus.unsplash.com/premium_photo-1671028546491-f70b21a32cc2?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8RHVtYmJlbGxzfGVufDB8fDB8fHww",
    "stock": 10
  },
  {
    "title": "Yoga Mat",
    "description": "Anti-slip yoga mat",
    "price": 599,
    "category": "sports",
    "image": "https://images.unsplash.com/photo-1637157216470-d92cd2edb2e8?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8WW9nYSUyME1hdHxlbnwwfHwwfHx8MA%3D%3D",
    "stock": 30
  },
  {
    "title": "Skipping Rope",
    "description": "Fitness skipping rope",
    "price": 199,
    "category": "sports",
    "image": "https://images.unsplash.com/photo-1516876345887-6dd74f80787a?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8U2tpcHBpbmclMjBSb3BlfGVufDB8fDB8fHww",
    "stock": 50
  },
  //toys
  {
    "title": "Teddy Bear",
    "description": "Soft plush teddy",
    "price": 499,
    "category": "toys",
    "image": "https://images.unsplash.com/photo-1602734846297-9299fc2d4703?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8VGVkZHklMjBCZWFyfGVufDB8fDB8fHww",
    "stock": 35
  },
  {
    "title": "Puzzle Game",
    "description": "Brain teaser puzzle",
    "price": 299,
    "category": "toys",
    "image": "https://images.unsplash.com/photo-1601063987324-7b482964872b?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8UHV6emxlJTIwR2FtZXxlbnwwfHwwfHx8MA%3D%3D",
    "stock": 40
  },
  {
    "title": "Toy Car",
    "description": "Mini car toy",
    "price": 199,
    "category": "toys",
    "image": "https://images.unsplash.com/photo-1609708536965-6e5b915b195b?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8VG95JTIwQ2FyfGVufDB8fDB8fHww",
    "stock": 50
  },
  {
    "title": "Building Blocks",
    "description": "Creative block set",
    "price": 999,
    "category": "toys",
    "image": "https://images.unsplash.com/photo-1539477192933-1a7dde04aa77?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8QnVpbGRpbmclMjBCbG9ja3N8ZW58MHx8MHx8fDA%3D",
    "stock": 20
  },
  {
    "title": "Remote Car",
    "description": "RC car with remote",
    "price": 1499,
    "category": "toys",
    "image": "https://images.unsplash.com/photo-1760012836840-1514ff249263?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8UmVtb3RlJTIwQ2FyfGVufDB8fDB8fHww",
    "stock": 15
  },
  //groceries
  {
    "title": "Rice",
    "description": "Premium basmati rice",
    "price": 1200,
    "category": "groceries",
    "image": "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8UmljZXxlbnwwfHwwfHx8MA%3D%3D",
    "stock": 100
  },
  {
    "title": "Wheat Flour",
    "description": "Whole wheat atta",
    "price": 500,
    "category": "groceries",
    "image": "https://plus.unsplash.com/premium_photo-1671377660174-e43996bfdf03?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8V2hlYXQlMjBGbG91cnxlbnwwfHwwfHx8MA%3D%3D",
    "stock": 80
  },
  {
    "title": "Cooking Oil",
    "description": "Refined sunflower oil",
    "price": 1500,
    "category": "groceries",
    "image": "https://plus.unsplash.com/premium_photo-1664391616054-1671f1b7f75d?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Q29va2luZyUyME9pbHxlbnwwfHwwfHx8MA%3D%3D",
    "stock": 60
  },
  {
    "title": "Sugar",
    "description": "Fine grain sugar",
    "price": 400,
    "category": "groceries",
    "image": "https://images.unsplash.com/photo-1634612831148-03a8550e1d52?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8U3VnYXJ8ZW58MHx8MHx8fDA%3D",
    "stock": 90
  },
  {
    "title": "Tea",
    "description": "Premium tea leaves",
    "price": 350,
    "category": "groceries",
    "image": "https://images.unsplash.com/photo-1628153792464-21bffac488d4?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dGVhJTIwbGVhZnxlbnwwfHwwfHx8MA%3D%3D",
    "stock": 70
  },
]

export default sampleListing;