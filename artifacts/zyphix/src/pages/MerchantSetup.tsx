import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check, Store, Clock, FileText, Sparkles } from 'lucide-react';
import { useLocation } from 'wouter';
import { ZyphixLogo } from '@/components/ZyphixLogo';

const G = '#0DA366'; const T1 = '#111827'; const T2 = '#6B7280';
const T3 = '#9CA3AF'; const BD = '#E5E7EB'; const W = '#FFFFFF'; const BG = '#F8F9FA';
const SH = '0 2px 8px rgba(0,0,0,.07)'; const SH2 = '0 4px 24px rgba(0,0,0,.10)';

const tw = (emoji: string) => {
  const cp = [...emoji].map(c=>c.codePointAt(0)!.toString(16)).filter(h=>parseInt(h,16)!==0xfe0f && parseInt(h,16)!==0x200d).join('_');
  return `https://fonts.gstatic.com/s/e/notoemoji/latest/${cp}/512.png`;
};

const CATS = [
  { id:'fruits_veg',  e:tw('🥬'), n:'Fruits & Vegetables', c:'#16a34a', bg:'#ECFDF5' },
  { id:'dairy',       e:tw('🥛'), n:'Dairy & Eggs',        c:'#2563eb', bg:'#EFF6FF' },
  { id:'snacks',      e:tw('🍿'), n:'Snacks',              c:'#d97706', bg:'#FFFBEB' },
  { id:'beverages',   e:tw('🧃'), n:'Cold Drinks',         c:'#0891b2', bg:'#ECFEFF' },
  { id:'grains',      e:tw('🌾'), n:'Rice, Dal & Grains',  c:'#78350f', bg:'#FFFBEB' },
  { id:'spices',      e:tw('🌶'),  n:'Spices & Masala',    c:'#dc2626', bg:'#FFF1F2' },
  { id:'atta',        e:tw('🍞'), n:'Atta, Flour & Bread', c:'#c2410c', bg:'#FFF7ED' },
  { id:'oil',         e:tw('🫙'), n:'Oils & Ghee',         c:'#b45309', bg:'#FFFBEB' },
  { id:'breakfast',   e:tw('🥣'), n:'Breakfast & Cereal',  c:'#7c3aed', bg:'#F5F3FF' },
  { id:'biscuits',    e:tw('🍪'), n:'Biscuits & Cakes',    c:'#d97706', bg:'#FFFBEB' },
  { id:'noodles',     e:tw('🍜'), n:'Noodles & Pasta',     c:'#dc2626', bg:'#FFF1F2' },
  { id:'tea',         e:tw('☕'), n:'Tea & Coffee',        c:'#92400e', bg:'#FFF7ED' },
  { id:'personal',    e:tw('💄'), n:'Personal Care',       c:'#db2777', bg:'#FDF2F8' },
  { id:'household',   e:tw('🧹'), n:'Household Items',     c:'#4f46e5', bg:'#EEF2FF' },
  { id:'cleaning',    e:tw('🧴'), n:'Cleaning & Detergents',c:'#0284c7',bg:'#F0F9FF' },
  { id:'baby',        e:tw('👶'), n:'Baby Products',       c:'#0891b2', bg:'#ECFEFF' },
  { id:'pharmacy',    e:tw('💊'), n:'Medicines & Health',  c:'#0f766e', bg:'#F0FDFA' },
  { id:'frozen',      e:tw('❄'),  n:'Frozen Foods',        c:'#0284c7', bg:'#F0F9FF' },
  { id:'pet',         e:tw('🐾'), n:'Pet Products',        c:'#78350f', bg:'#FFFBEB' },
  { id:'stationery',  e:tw('✏'),  n:'Stationery',          c:'#4f46e5', bg:'#EEF2FF' },
];

const SUB_CATS: Record<string, string[]> = {
  fruits_veg: ['Tomatoes','Potatoes','Onions','Garlic','Ginger','Capsicum','Cauliflower','Cabbage','Brinjal','Ladyfinger','Spinach','Methi','Peas','Carrot','Beetroot','Radish','Apples','Bananas','Mangoes','Oranges','Grapes','Guava','Papaya','Watermelon','Pomegranate','Lemon','Pears','Kiwi','Pineapple','Coconut'],
  dairy:      ['Full Cream Milk','Toned Milk','Double Toned Milk','Curd / Dahi','Paneer','Butter','Ghee','Cream','Cheese','Condensed Milk','Lassi','Buttermilk (Chaas)','Eggs (6 pack)','Eggs (12 pack)','Flavoured Milk','Tofu'],
  snacks:     ['Potato Chips','Bhujia','Namkeen','Popcorn','Peanuts','Roasted Chana','Mukhwas','Trail Mix','Papad','Khakhra','Mathri','Bikaneri Bhujia','Aloo Bhujia','Ribbon Pakoda','Corn Puffs','Rice Crackers','Prawn Crackers','Banana Chips','Chakli','Dry Fruits Mix'],
  beverages:  ['Cola (Pepsi/Coke)','Sprite/7UP','Limca','Thums Up','Maaza / Slice','Real Juice','Paper Boat','Tropicana','Coconut Water','Packaged Drinking Water','Sparkling Water','Energy Drinks (Red Bull)','Iced Tea','Nimbu Pani Mix','Rooh Afza','Aam Panna','Jaljeera'],
  grains:     ['Basmati Rice (1kg)','Basmati Rice (5kg)','Non-Basmati Rice','Brown Rice','Toor Dal','Moong Dal','Chana Dal','Urad Dal','Masoor Dal','Rajma','Kala Chana','White Peas','Lobia','Soya Chunks','Wheat','Jowar','Bajra','Maize','Oats','Barley'],
  spices:     ['Turmeric Powder','Red Chilli Powder','Coriander Powder','Cumin Seeds','Cumin Powder','Garam Masala','Black Pepper','Green Cardamom','Cloves','Cinnamon','Bay Leaves','Hing (Asafoetida)','Mustard Seeds','Fenugreek Seeds','Fennel Seeds','Amchur Powder','Chaat Masala','Biryani Masala','Chicken Masala','Pav Bhaji Masala','Sambar Powder','Meat Masala','Kitchen King'],
  atta:       ['Wheat Atta (5kg)','Wheat Atta (10kg)','Multigrain Atta','Besan (Gram Flour)','Maida (All Purpose)','Sooji / Rava','Rice Flour','Ragi Flour','Corn Flour','Jowar Flour','Bajra Flour','White Bread','Brown Bread','Multigrain Bread','Sandwich Bread','Pav (Dinner Rolls)','Burger Buns','Bread Sticks','Rusk'],
  oil:        ['Sunflower Oil (1L)','Sunflower Oil (5L)','Mustard Oil','Soyabean Oil','Groundnut Oil','Rice Bran Oil','Coconut Oil','Refined Vegetable Oil','Olive Oil','Palm Oil','Desi Ghee (Cow)','Desi Ghee (Buffalo)','Vanaspati','Butter (Cooking)'],
  breakfast:  ['Cornflakes','Muesli','Granola','Poha (Flattened Rice)','Upma Mix','Idli Batter','Dosa Batter','Instant Oats','Rolled Oats','Semiya (Vermicelli)','Suji Halwa Mix','Sabudana (Sago)','Beaten Rice','Sattu','Quinoa','Protein Oats'],
  biscuits:   ['Marie Biscuits','Glucose Biscuits','Cream Biscuits (Bourbon)','Cream Biscuits (Hide & Seek)','Digestive Biscuits','Khari Biscuit','Good Day','Oreo','Parle-G','Monaco','Jim Jam','Rusk','Milk Rusk','Wafers','Cookies','Butter Cookies','Almond Cookies','Chocolate Chip Cookies','Cake Slice','Muffins'],
  noodles:    ['Maggi Noodles','Yippee Noodles','Top Ramen','Knorr Noodles','Wai Wai','Cup Noodles','Wheat Noodles','Rice Noodles','Spaghetti Pasta','Penne Pasta','Fusilli Pasta','Macaroni','Hakka Noodles','Glass Noodles','Biryani Kit','Pasta Sauce (Arrabiata)','Pasta Sauce (White)'],
  tea:        ['Tata Tea Gold','Tata Tea Agni','Red Label','Taj Mahal','Green Tea','Tulsi Tea','Ginger Tea','Chamomile Tea','Peppermint Tea','Darjeeling Tea','Masala Chai Mix','Filter Coffee','Bru Instant Coffee','Nescafe Classic','Nescafe Gold','Cold Coffee Mix','Chai Premix','Kadak Chai Mix'],
  personal:   ['Shampoo (Regular)','Shampoo (Anti-Dandruff)','Conditioner','Body Wash','Soap Bar','Face Wash','Moisturizer','Sunscreen SPF 50','Deodorant','Perfume','Toothpaste','Toothbrush','Mouthwash','Face Scrub','Toner','Serum','Hair Oil','Hair Gel','Razors','Shaving Cream','Sanitary Pads','Panty Liners','Tampons','Intimate Wash'],
  household:  ['Brooms','Mops','Dustpan','Floor Cleaning Brush','Scrubber Pads','Dish Cloth','Duster','Mop Refill','Dustbin Bags','Candles','Matchboxes','AA Batteries','AAA Batteries','LED Bulbs','Extension Cord','Mosquito Repellent','Rat Poison','Fly Swatter','Air Freshener','Room Freshener Spray','Incense Sticks (Agarbatti)','Dhoop','Camphor (Kapoor)'],
  cleaning:   ['Washing Powder (1kg)','Washing Powder (5kg)','Liquid Detergent','Fabric Softener','Dishwash Bar','Dishwash Liquid','Floor Cleaner (Phenyl)','Floor Cleaner (Lizol)','Toilet Cleaner (Harpic)','Bathroom Cleaner','Glass Cleaner','Surface Disinfectant','Multi-Purpose Spray','Scrubber (Steel)','Scrubber (Sponge)','Drain Cleaner','Shoe Cleaner','Dry Cleaning Sheets'],
  baby:       ['Baby Formula (Stage 1)','Baby Formula (Stage 2)','Baby Cereal','Baby Food Puree','Baby Biscuits','Diapers (S)','Diapers (M)','Diapers (L)','Baby Wipes','Baby Shampoo','Baby Soap','Baby Oil','Baby Powder','Baby Lotion','Baby Cream','Diaper Rash Cream','Baby Toothbrush','Baby Toothpaste','Baby Bottle','Pacifier','Baby Clothes (Onesie)'],
  pharmacy:   ['Paracetamol (Crocin/Dolo)','Ibuprofen','Antacid (Gelusil/Pudin Hara)','ORS Sachet','Vitamin C','Vitamin D3','Multivitamin','Calcium Tablets','Iron Supplement','Cough Syrup','Cold & Flu Tablets','Antihistamine','Eye Drops','Nasal Drops','Bandages','Cotton Wool','Dettol Antiseptic','Betadine','Hand Sanitizer','Face Masks','Glucometer Strips','BP Monitor','Thermometer','Pulse Oximeter'],
  frozen:     ['Frozen Green Peas','Frozen Sweet Corn','Frozen Mixed Vegetables','Frozen Spinach','Frozen Paneer','Frozen Parathas','Frozen Samosas','Frozen Spring Rolls','Frozen French Fries','Frozen Pizza','Frozen Burger Patty','Frozen Chicken Nuggets','Frozen Fish','Ice Cream (Vanilla)','Ice Cream (Chocolate)','Ice Cream (Strawberry)','Kulfi','Frozen Desserts'],
  pet:        ['Dog Dry Food','Dog Wet Food','Cat Dry Food','Cat Wet Food','Fish Food','Bird Seeds','Dog Treats','Cat Treats','Pet Shampoo (Dog)','Pet Shampoo (Cat)','Dog Leash','Dog Collar','Cat Litter','Litter Tray','Pet Bed','Pet Toys (Ball)','Pet Toys (Rope)','Flea & Tick Spray','Deworming Tablets','Pet Vitamin Drops'],
  stationery: ['Ball Pens (Blue)','Ball Pens (Black)','Gel Pens','Pencils (HB)','Pencils (2B)','Eraser','Sharpener','Ruler','Notebooks (Single Line)','Notebooks (Square)','Register (200 Pages)','Register (400 Pages)','Drawing Book','Sketch Pens','Crayons','Stapler','Staple Pins','Paper Clips','Glue Stick','Scissors','Sticky Notes','Highlighters','Files & Folders','Envelopes','Tape (Clear)','Double Tape'],
};

const STORE_TYPES = [
  { v:'kirana',    e:tw('🏪'), l:'Kirana / General Store' },
  { v:'super',     e:tw('🛒'), l:'Supermarket' },
  { v:'medical',   e:tw('💊'), l:'Medical Store' },
  { v:'bakery',    e:tw('🍞'), l:'Bakery & Confectionery' },
  { v:'fruits',    e:tw('🥬'), l:'Fruits & Vegetables' },
  { v:'dairy',     e:tw('🥛'), l:'Dairy & Milk Parlour' },
];

const AREAS = ['Gandhinagar','Trikuta Nagar','Gandhi Nagar','Bakshi Nagar','Nawabad','Channi Himmat','Sainik Colony','Talab Tillo','Janipur','Bathindi','Sarwal','Nardni','Sidhra','Canal Road','Other'];

const inp = (err?: string): React.CSSProperties => ({
  width:'100%', padding:'12px 14px', borderRadius:10,
  border:`1.5px solid ${err?'#EF4444':BD}`, background:W,
  fontSize:14, color:T1, outline:'none', boxSizing:'border-box',
  transition:'border-color .15s, box-shadow .15s',
});

const STEPS = [
  { label:'Store Info',  icon:<Store size={14}/> },
  { label:'Categories',  icon:<Sparkles size={14}/> },
  { label:'Business',    icon:<FileText size={14}/> },
  { label:'Done',        icon:<Check size={14}/> },
];

function StepBar({ step }: { step: number }) {
  return (
    <div style={{ background:W, borderBottom:`1px solid ${BD}`, padding:'0 24px' }}>
      <div style={{ maxWidth:900, margin:'0 auto', display:'flex', alignItems:'center', padding:'16px 0', gap:0 }}>
        {STEPS.map((s,i) => (
          <div key={s.label} style={{ display:'flex', alignItems:'center', flex: i<STEPS.length-1?1:'auto' }}>
            <div style={{ display:'flex', flexDirection:'column', alignItems:'center', minWidth:64 }}>
              <motion.div animate={{ background: i<=step?G:BD, color: i<=step?'#fff':T3 }}
                style={{ width:32, height:32, borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', marginBottom:5, transition:'all .3s' }}>
                {i<step ? <Check size={15}/> : i===step ? s.icon : <span style={{fontSize:12,fontWeight:700}}>{i+1}</span>}
              </motion.div>
              <span style={{ fontSize:10.5, fontWeight: i<=step?700:500, color:i<=step?T1:T3, whiteSpace:'nowrap' }}>{s.label}</span>
            </div>
            {i<STEPS.length-1 && (
              <div style={{ flex:1, height:2, margin:'0 4px', marginBottom:18, background:i<step?G:BD, transition:'background .3s' }} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Step 1: Store Info ─── */
function StoreInfoStep({ onNext }: { onNext:(d:object)=>void }) {
  const [form, setForm] = useState({ name:'', area:'', address:'', ownerName:'', phone:'', type:'' });
  const [errors, setErrors] = useState<Record<string,string>>({});
  const f = (k:string, v:string) => { setForm(p=>({...p,[k]:v})); setErrors(p=>({...p,[k]:''})); };

  const validate = () => {
    const e:Record<string,string>={};
    if (!form.name.trim()) e.name='Store name required';
    if (!form.area) e.area='Select your area';
    if (!form.address.trim()) e.address='Address required';
    if (!form.ownerName.trim()) e.ownerName='Owner name required';
    if (!/^[0-9]{10}$/.test(form.phone)) e.phone='Enter valid 10-digit number';
    if (!form.type) e.type='Select store type';
    return e;
  };

  const next = () => {
    const e = validate(); if (Object.keys(e).length){setErrors(e);return;}
    onNext(form);
  };

  return (
    <motion.div initial={{opacity:0,x:30}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-30}} transition={{type:'spring',stiffness:120,damping:18}}>
      <div style={{ maxWidth:640, margin:'0 auto' }}>
        <div style={{ marginBottom:28 }}>
          <h2 style={{ fontFamily:"'Outfit',sans-serif", fontWeight:900, fontSize:'1.55rem', color:T1, letterSpacing:'-.03em', marginBottom:6 }}>Tell us about your store</h2>
          <p style={{ color:T2, fontSize:14 }}>We'll use this to set up your listing on Zyphix</p>
        </div>

        {/* Store type */}
        <div style={{ marginBottom:20 }}>
          <label style={{ fontSize:12, fontWeight:700, color:T2, textTransform:'uppercase', letterSpacing:'.04em', display:'block', marginBottom:10 }}>Store Type</label>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:10 }}>
            {STORE_TYPES.map(({v,e,l})=>(
              <motion.button key={v} whileHover={{scale:1.03,y:-2}} whileTap={{scale:.97}}
                onClick={()=>f('type',v)}
                style={{ padding:'14px 10px', borderRadius:14, background:form.type===v?`${G}0F`:W, border:`2px solid ${form.type===v?G:BD}`, cursor:'pointer', textAlign:'center', display:'flex', flexDirection:'column', alignItems:'center', gap:6, boxShadow:form.type===v?`0 0 0 3px ${G}1A`:SH, transition:'all .15s' }}>
                <img src={e} alt={l} draggable={false} style={{width:36,height:36,objectFit:'contain'}} />
                <span style={{fontSize:10.5,fontWeight:700,color:form.type===v?'#065F46':T2,lineHeight:1.3}}>{l}</span>
              </motion.button>
            ))}
          </div>
          {errors.type && <p style={{fontSize:11.5,color:'#EF4444',marginTop:6}}>{errors.type}</p>}
        </div>

        <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
          {/* Store name */}
          <div>
            <label style={{ fontSize:12, fontWeight:700, color:T2, textTransform:'uppercase', letterSpacing:'.04em', display:'block', marginBottom:5 }}>Store Name</label>
            <input value={form.name} onChange={e=>f('name',e.target.value)} placeholder="e.g. Sharma Kirana Store"
              style={inp(errors.name)}
              onFocus={e=>{e.target.style.borderColor=G;e.target.style.boxShadow=`0 0 0 3px ${G}1A`;}}
              onBlur={e=>{e.target.style.borderColor=errors.name?'#EF4444':BD;e.target.style.boxShadow='none';}} />
            {errors.name && <p style={{fontSize:11.5,color:'#EF4444',marginTop:4}}>{errors.name}</p>}
          </div>

          {/* Area + Address */}
          <div style={{ display:'grid', gridTemplateColumns:'1fr 2fr', gap:12 }}>
            <div>
              <label style={{ fontSize:12, fontWeight:700, color:T2, textTransform:'uppercase', letterSpacing:'.04em', display:'block', marginBottom:5 }}>Area / Colony</label>
              <select value={form.area} onChange={e=>f('area',e.target.value)}
                style={{...inp(errors.area), appearance:'none', cursor:'pointer', color:form.area?T1:T3}}>
                <option value="">Select area</option>
                {AREAS.map(a=><option key={a} value={a}>{a}</option>)}
              </select>
              {errors.area && <p style={{fontSize:11.5,color:'#EF4444',marginTop:4}}>{errors.area}</p>}
            </div>
            <div>
              <label style={{ fontSize:12, fontWeight:700, color:T2, textTransform:'uppercase', letterSpacing:'.04em', display:'block', marginBottom:5 }}>Full Address</label>
              <input value={form.address} onChange={e=>f('address',e.target.value)} placeholder="Shop no., street, landmark"
                style={inp(errors.address)}
                onFocus={e=>{e.target.style.borderColor=G;e.target.style.boxShadow=`0 0 0 3px ${G}1A`;}}
                onBlur={e=>{e.target.style.borderColor=errors.address?'#EF4444':BD;e.target.style.boxShadow='none';}} />
              {errors.address && <p style={{fontSize:11.5,color:'#EF4444',marginTop:4}}>{errors.address}</p>}
            </div>
          </div>

          {/* Owner + Phone */}
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
            <div>
              <label style={{ fontSize:12, fontWeight:700, color:T2, textTransform:'uppercase', letterSpacing:'.04em', display:'block', marginBottom:5 }}>Owner Name</label>
              <input value={form.ownerName} onChange={e=>f('ownerName',e.target.value)} placeholder="Your full name"
                style={inp(errors.ownerName)}
                onFocus={e=>{e.target.style.borderColor=G;e.target.style.boxShadow=`0 0 0 3px ${G}1A`;}}
                onBlur={e=>{e.target.style.borderColor=errors.ownerName?'#EF4444':BD;e.target.style.boxShadow='none';}} />
              {errors.ownerName && <p style={{fontSize:11.5,color:'#EF4444',marginTop:4}}>{errors.ownerName}</p>}
            </div>
            <div>
              <label style={{ fontSize:12, fontWeight:700, color:T2, textTransform:'uppercase', letterSpacing:'.04em', display:'block', marginBottom:5 }}>Mobile Number</label>
              <input value={form.phone} onChange={e=>f('phone',e.target.value)} type="tel" inputMode="numeric" maxLength={10} placeholder="10-digit number"
                style={inp(errors.phone)}
                onFocus={e=>{e.target.style.borderColor=G;e.target.style.boxShadow=`0 0 0 3px ${G}1A`;}}
                onBlur={e=>{e.target.style.borderColor=errors.phone?'#EF4444':BD;e.target.style.boxShadow='none';}} />
              {errors.phone && <p style={{fontSize:11.5,color:'#EF4444',marginTop:4}}>{errors.phone}</p>}
            </div>
          </div>
        </div>

        <motion.button onClick={next} whileHover={{scale:1.02}} whileTap={{scale:.97}}
          style={{ width:'100%', marginTop:28, padding:'15px', borderRadius:13, background:G, color:'#fff', fontSize:15.5, fontWeight:800, border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:8, boxShadow:`0 6px 24px ${G}45` }}>
          Continue to Categories <ArrowRight size={16}/>
        </motion.button>
      </div>
    </motion.div>
  );
}

/* ─── Step 2: Categories ─── */
function CategoriesStep({ onNext, onBack }: { onNext:(s:Set<string>)=>void; onBack:()=>void }) {
  const [selectedCats, setSelectedCats] = useState<Set<string>>(new Set());
  const [expandedCat, setExpandedCat] = useState<string|null>(null);
  const [selectedSubs, setSelectedSubs] = useState<Record<string,Set<string>>>({});

  const getSubs = (id:string): Set<string> => selectedSubs[id] ?? new Set();
  const totalItems = Object.values(selectedSubs).reduce((acc,s)=>acc+s.size,0);

  const handleCatClick = (id:string) => {
    if (expandedCat === id) { setExpandedCat(null); return; }
    setExpandedCat(id);
    setSelectedCats(prev => { const n=new Set(prev); n.add(id); return n; });
  };

  const toggleSub = (catId:string, item:string) => {
    setSelectedSubs(prev => {
      const cur = new Set(prev[catId] ?? []);
      cur.has(item) ? cur.delete(item) : cur.add(item);
      return {...prev, [catId]: cur};
    });
    setSelectedCats(prev => { const n=new Set(prev); n.add(catId); return n; });
  };

  const addAll = (catId:string) => {
    const all = new Set(SUB_CATS[catId] ?? []);
    setSelectedSubs(prev => ({...prev, [catId]: all}));
    setSelectedCats(prev => { const n=new Set(prev); n.add(catId); return n; });
  };

  const clearAll = (catId:string) => {
    setSelectedSubs(prev => ({...prev, [catId]: new Set()}));
  };

  const expandedCatData = expandedCat ? CATS.find(c=>c.id===expandedCat) : null;
  const expandedSubs    = expandedCat ? (SUB_CATS[expandedCat] ?? []) : [];
  const expandedSelSet  = expandedCat ? getSubs(expandedCat) : new Set<string>();

  return (
    <motion.div initial={{opacity:0,x:30}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-30}} transition={{type:'spring',stiffness:120,damping:18}}>
      <div style={{ marginBottom:20 }}>
        <h2 style={{ fontFamily:"'Outfit',sans-serif", fontWeight:900, fontSize:'1.55rem', color:T1, letterSpacing:'-.03em', marginBottom:6 }}>What do you sell?</h2>
        <p style={{ color:T2, fontSize:14 }}>Tap a category to pick the exact items — or use "Add All"</p>
        {totalItems>0 && (
          <motion.div initial={{opacity:0,y:-8}} animate={{opacity:1,y:0}}
            style={{ display:'inline-flex', alignItems:'center', gap:7, background:`${G}12`, border:`1px solid ${G}35`, color:G, fontSize:12.5, fontWeight:700, padding:'5px 14px', borderRadius:99, marginTop:10 }}>
            <Check size={13}/> {totalItems} items across {selectedCats.size} {selectedCats.size===1?'category':'categories'}
          </motion.div>
        )}
      </div>

      {/* Category grid */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(130px,1fr))', gap:10, marginBottom:16 }}>
        {CATS.map(({id,e,n,c,bg},i)=>{
          const isExpanded = expandedCat === id;
          const subCount   = getSubs(id).size;
          const hasItems   = subCount > 0;
          return (
            <motion.button key={id}
              initial={{opacity:0,scale:.9}} animate={{opacity:1,scale:1}} transition={{delay:i*.03,type:'spring',stiffness:200}}
              whileHover={{scale:1.03,y:-2}} whileTap={{scale:.97}}
              onClick={()=>handleCatClick(id)}
              style={{ padding:'14px 8px 12px', borderRadius:14, background:isExpanded||hasItems?bg:W, border:`2px solid ${isExpanded||hasItems?c:BD}`, cursor:'pointer', textAlign:'center', display:'flex', flexDirection:'column', alignItems:'center', gap:6, boxShadow:isExpanded||hasItems?`0 4px 16px ${c}25`:SH, transition:'all .15s', position:'relative' }}>
              {hasItems && (
                <div style={{ position:'absolute', top:6, right:6, minWidth:20, height:20, borderRadius:99, background:c, display:'flex', alignItems:'center', justifyContent:'center', fontSize:10, fontWeight:800, color:'#fff', padding:'0 5px' }}>
                  {subCount}
                </div>
              )}
              <img src={e} alt={n} draggable={false} style={{width:34,height:34,objectFit:'contain'}} />
              <span style={{fontSize:10.5,fontWeight:700,color:isExpanded||hasItems?c:T2,lineHeight:1.3}}>{n}</span>
            </motion.button>
          );
        })}
      </div>

      {/* Subcategory panel */}
      <AnimatePresence>
        {expandedCat && expandedCatData && (
          <motion.div
            key={expandedCat}
            initial={{opacity:0,y:-12,scale:.98}} animate={{opacity:1,y:0,scale:1}} exit={{opacity:0,y:-8,scale:.98}}
            transition={{type:'spring',stiffness:260,damping:22}}
            style={{ background:expandedCatData.bg, border:`2px solid ${expandedCatData.c}40`, borderRadius:18, padding:'18px 20px', marginBottom:20, boxShadow:`0 8px 32px ${expandedCatData.c}18` }}>
            {/* Panel header */}
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:14 }}>
              <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                <img src={expandedCatData.e} alt="" draggable={false} style={{width:28,height:28,objectFit:'contain'}} />
                <div>
                  <p style={{ fontFamily:"'Outfit',sans-serif", fontWeight:800, fontSize:14.5, color:T1, marginBottom:1 }}>{expandedCatData.n}</p>
                  <p style={{ fontSize:11.5, color:T2 }}>{expandedSelSet.size} of {expandedSubs.length} items selected</p>
                </div>
              </div>
              <div style={{ display:'flex', gap:8, alignItems:'center' }}>
                {expandedSelSet.size < expandedSubs.length ? (
                  <button onClick={()=>addAll(expandedCat)}
                    style={{ padding:'6px 14px', borderRadius:99, background:expandedCatData.c, color:'#fff', fontSize:12, fontWeight:800, border:'none', cursor:'pointer', display:'flex', alignItems:'center', gap:5 }}>
                    <Check size={12}/> Add All
                  </button>
                ) : (
                  <button onClick={()=>clearAll(expandedCat)}
                    style={{ padding:'6px 14px', borderRadius:99, background:'#EF4444', color:'#fff', fontSize:12, fontWeight:800, border:'none', cursor:'pointer' }}>
                    Clear All
                  </button>
                )}
                <button onClick={()=>setExpandedCat(null)}
                  style={{ padding:'6px 12px', borderRadius:99, background:'rgba(0,0,0,.08)', color:T1, fontSize:12, fontWeight:700, border:'none', cursor:'pointer' }}>
                  Done ✓
                </button>
              </div>
            </div>

            {/* Item chips */}
            <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
              {expandedSubs.map(item => {
                const on = expandedSelSet.has(item);
                return (
                  <motion.button key={item} whileHover={{scale:1.04}} whileTap={{scale:.96}}
                    onClick={()=>toggleSub(expandedCat, item)}
                    style={{ padding:'6px 14px', borderRadius:99, background:on?expandedCatData.c:'rgba(255,255,255,.85)', border:`1.5px solid ${on?expandedCatData.c:BD}`, color:on?'#fff':T1, fontSize:12.5, fontWeight:on?700:500, cursor:'pointer', transition:'all .12s', boxShadow:on?`0 2px 8px ${expandedCatData.c}35`:'none', display:'flex', alignItems:'center', gap:5 }}>
                    {on && <Check size={11} strokeWidth={3}/>}
                    {item}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div style={{ display:'flex', gap:12 }}>
        <button onClick={onBack}
          style={{ padding:'14px 22px', borderRadius:12, background:W, border:`1.5px solid ${BD}`, color:T2, fontSize:14, fontWeight:700, cursor:'pointer', display:'flex', alignItems:'center', gap:6 }}>
          <ArrowLeft size={15}/> Back
        </button>
        <motion.button onClick={()=>onNext(selectedCats)} whileHover={{scale:1.02}} whileTap={{scale:.97}}
          style={{ flex:1, padding:'15px', borderRadius:13, background: selectedCats.size>0?G:'#9CA3AF', color:'#fff', fontSize:15, fontWeight:800, border:'none', cursor: selectedCats.size>0?'pointer':'not-allowed', display:'flex', alignItems:'center', justifyContent:'center', gap:8, transition:'background .2s', boxShadow: selectedCats.size>0?`0 6px 24px ${G}45`:'none' }}>
          Continue {totalItems>0?`(${totalItems} items)`:''} <ArrowRight size={16}/>
        </motion.button>
      </div>
    </motion.div>
  );
}

/* ─── Step 3: Business Details ─── */
function BusinessStep({ onNext, onBack }: { onNext:()=>void; onBack:()=>void }) {
  const [hasGst, setHasGst] = useState<boolean|null>(null);
  const [gst, setGst] = useState('');
  const [timings, setTimings] = useState({ open:'08:00', close:'22:00' });
  const [days, setDays] = useState<Set<string>>(new Set(['Mon','Tue','Wed','Thu','Fri','Sat','Sun']));
  const DAYS = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
  const toggleDay = (d:string)=>setDays(p=>{const n=new Set(p);n.has(d)?n.delete(d):n.add(d);return n;});

  return (
    <motion.div initial={{opacity:0,x:30}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-30}} transition={{type:'spring',stiffness:120,damping:18}}>
      <div style={{ maxWidth:640, margin:'0 auto' }}>
        <div style={{ marginBottom:24 }}>
          <h2 style={{ fontFamily:"'Outfit',sans-serif", fontWeight:900, fontSize:'1.55rem', color:T1, letterSpacing:'-.03em', marginBottom:6 }}>Business Details</h2>
          <p style={{ color:T2, fontSize:14 }}>Almost done — tell us your working hours and tax info</p>
        </div>

        {/* Working Days */}
        <div style={{ marginBottom:22 }}>
          <label style={{ fontSize:12, fontWeight:700, color:T2, textTransform:'uppercase', letterSpacing:'.04em', display:'block', marginBottom:10 }}>Open Days</label>
          <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
            {DAYS.map(d=>{
              const on=days.has(d);
              return (
                <motion.button key={d} whileHover={{scale:1.05}} whileTap={{scale:.95}} onClick={()=>toggleDay(d)}
                  style={{ padding:'8px 14px', borderRadius:99, background:on?G:W, border:`1.5px solid ${on?G:BD}`, color:on?'#fff':T2, fontSize:12.5, fontWeight:700, cursor:'pointer', transition:'all .15s', boxShadow:on?`0 2px 8px ${G}35`:SH }}>
                  {d}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Hours */}
        <div style={{ marginBottom:22 }}>
          <label style={{ fontSize:12, fontWeight:700, color:T2, textTransform:'uppercase', letterSpacing:'.04em', display:'block', marginBottom:10 }}>
            <Clock size={12} style={{display:'inline',marginRight:5}} />Opening Hours
          </label>
          <div style={{ display:'flex', alignItems:'center', gap:16, background:W, border:`1.5px solid ${BD}`, borderRadius:12, padding:'14px 18px', boxShadow:SH }}>
            <div style={{ display:'flex', flexDirection:'column', gap:4, flex:1 }}>
              <span style={{ fontSize:11, fontWeight:700, color:T3, textTransform:'uppercase' }}>Opens At</span>
              <input type="time" value={timings.open} onChange={e=>setTimings(p=>({...p,open:e.target.value}))}
                style={{ border:'none', outline:'none', fontSize:20, fontWeight:800, color:T1, background:'transparent', cursor:'pointer' }} />
            </div>
            <div style={{ width:1, height:40, background:BD }} />
            <div style={{ display:'flex', flexDirection:'column', gap:4, flex:1 }}>
              <span style={{ fontSize:11, fontWeight:700, color:T3, textTransform:'uppercase' }}>Closes At</span>
              <input type="time" value={timings.close} onChange={e=>setTimings(p=>({...p,close:e.target.value}))}
                style={{ border:'none', outline:'none', fontSize:20, fontWeight:800, color:T1, background:'transparent', cursor:'pointer' }} />
            </div>
          </div>
        </div>

        {/* GST */}
        <div style={{ marginBottom:28 }}>
          <label style={{ fontSize:12, fontWeight:700, color:T2, textTransform:'uppercase', letterSpacing:'.04em', display:'block', marginBottom:10 }}>Do you have a GST number?</label>
          <div style={{ display:'flex', gap:10, marginBottom: hasGst?14:0 }}>
            {[{v:true,l:'Yes, I have GST'},{v:false,l:'No, not registered'}].map(({v,l})=>(
              <motion.button key={String(v)} whileHover={{scale:1.02}} whileTap={{scale:.97}}
                onClick={()=>setHasGst(v)}
                style={{ flex:1, padding:'13px', borderRadius:12, background:hasGst===v?(v?`${G}0F`:'#FFF1F2'):W, border:`2px solid ${hasGst===v?(v?G:'#EF4444'):BD}`, color:hasGst===v?(v?'#065F46':'#9F1239'):T2, fontSize:13.5, fontWeight:700, cursor:'pointer', transition:'all .15s', boxShadow:SH }}>
                {l}
              </motion.button>
            ))}
          </div>
          <AnimatePresence>
            {hasGst && (
              <motion.div initial={{height:0,opacity:0}} animate={{height:'auto',opacity:1}} exit={{height:0,opacity:0}}>
                <input value={gst} onChange={e=>setGst(e.target.value.toUpperCase())} placeholder="GST Number (e.g. 01ABCDE1234F1Z5)"
                  style={{...inp(), marginTop:8}} maxLength={15}
                  onFocus={e=>{e.target.style.borderColor=G;e.target.style.boxShadow=`0 0 0 3px ${G}1A`;}}
                  onBlur={e=>{e.target.style.borderColor=BD;e.target.style.boxShadow='none';}} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div style={{ display:'flex', gap:12 }}>
          <button onClick={onBack}
            style={{ padding:'14px 22px', borderRadius:12, background:W, border:`1.5px solid ${BD}`, color:T2, fontSize:14, fontWeight:700, cursor:'pointer', display:'flex', alignItems:'center', gap:6 }}>
            <ArrowLeft size={15}/> Back
          </button>
          <motion.button onClick={onNext} whileHover={{scale:1.02}} whileTap={{scale:.97}}
            style={{ flex:1, padding:'15px', borderRadius:13, background:G, color:'#fff', fontSize:15.5, fontWeight:800, border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:8, boxShadow:`0 6px 24px ${G}45` }}>
            Submit Store Registration <ArrowRight size={16}/>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Step 4: Success ─── */
function SuccessStep({ storeData, categories }: { storeData: Record<string,string>; categories: Set<string> }) {
  const [, setLoc] = useLocation();
  return (
    <motion.div initial={{opacity:0,scale:.9}} animate={{opacity:1,scale:1}} transition={{type:'spring',stiffness:180}}
      style={{ maxWidth:540, margin:'0 auto', textAlign:'center', padding:'20px 0' }}>
      <motion.div animate={{rotate:[0,12,-12,8,-6,0],scale:[1,1.3,1]}} transition={{duration:.8}}
        style={{fontSize:64,marginBottom:20}}>🏪</motion.div>
      <h2 style={{ fontFamily:"'Outfit',sans-serif", fontWeight:900, fontSize:'1.8rem', color:T1, letterSpacing:'-.03em', marginBottom:10 }}>
        {storeData.name || 'Your Store'} is registered!
      </h2>
      <p style={{ color:T2, fontSize:14.5, lineHeight:1.7, marginBottom:28 }}>
        We've received your registration. Our team will contact you on <strong>{storeData.phone}</strong> to verify your store and set up your Zyphix listing.
      </p>

      {/* Categories summary */}
      {categories.size>0 && (
        <div style={{ background:W, borderRadius:16, padding:'18px 20px', border:`1px solid ${BD}`, boxShadow:SH, marginBottom:20, textAlign:'left' }}>
          <p style={{ fontSize:12, fontWeight:700, color:T3, textTransform:'uppercase', letterSpacing:'.05em', marginBottom:12 }}>Categories Selected ({categories.size})</p>
          <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
            {[...categories].map(id=>{
              const cat = CATS.find(c=>c.id===id);
              if (!cat) return null;
              return (
                <span key={id} style={{ display:'inline-flex', alignItems:'center', gap:5, background:cat.bg, border:`1px solid ${cat.c}30`, color:cat.c, fontSize:12, fontWeight:700, padding:'5px 11px', borderRadius:99 }}>
                  {cat.e} {cat.n}
                </span>
              );
            })}
          </div>
        </div>
      )}

      <div style={{ background:`${G}0C`, border:`1.5px solid ${G}30`, borderRadius:14, padding:'16px 20px', marginBottom:24 }}>
        <p style={{ fontSize:13, color:G, fontWeight:700, marginBottom:4 }}>⏱ What happens next?</p>
        <ul style={{ listStyle:'none', padding:0, margin:0, display:'flex', flexDirection:'column', gap:6 }}>
          {['Our team verifies your store (24-48 hrs)','We help you set up your product catalogue','Your store goes live on Zyphix!'].map((s,i)=>(
            <li key={i} style={{ fontSize:13, color:T2, display:'flex', alignItems:'center', gap:8 }}>
              <span style={{ width:18, height:18, borderRadius:'50%', background:G, color:'#fff', fontSize:10, fontWeight:900, display:'inline-flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>{i+1}</span>
              {s}
            </li>
          ))}
        </ul>
      </div>

      <motion.button onClick={()=>setLoc('/')} whileHover={{scale:1.02}} whileTap={{scale:.97}}
        style={{ padding:'14px 32px', borderRadius:12, background:G, color:'#fff', fontSize:14.5, fontWeight:800, border:'none', cursor:'pointer', boxShadow:`0 4px 20px ${G}40` }}>
        Back to Home
      </motion.button>
    </motion.div>
  );
}

/* ─── Main Page ─── */
export function MerchantSetup() {
  const [step, setStep] = useState(0);
  const [storeData, setStoreData] = useState<Record<string,string>>({});
  const [categories, setCategories] = useState<Set<string>>(new Set());
  const [, setLoc] = useLocation();

  const handleStoreNext = (d: object) => { setStoreData(d as Record<string,string>); setStep(1); window.scrollTo(0,0); };
  const handleCatsNext  = (s: Set<string>) => { setCategories(s); setStep(2); window.scrollTo(0,0); };
  const handleBizNext   = () => { setStep(3); window.scrollTo(0,0); };

  return (
    <div style={{ background:BG, minHeight:'100vh' }}>
      {/* Header */}
      <div style={{ background:W, borderBottom:`1px solid ${BD}`, padding:'0 24px', position:'sticky', top:0, zIndex:50, boxShadow:SH }}>
        <div style={{ maxWidth:1100, margin:'0 auto', height:60, display:'flex', alignItems:'center', gap:14 }}>
          <button onClick={()=>setLoc('/')} style={{ background:BG, border:`1px solid ${BD}`, borderRadius:8, padding:'6px 10px', cursor:'pointer', display:'flex', alignItems:'center', gap:5, color:T2, fontSize:13, fontWeight:600 }}>
            <ArrowLeft size={14}/> Home
          </button>
          <ZyphixLogo size={30} />
          <div style={{ height:20, width:1, background:BD }} />
          <span style={{ fontFamily:"'Outfit',sans-serif", fontWeight:800, fontSize:14.5, color:T1 }}>Register Your Store</span>
          <div style={{ marginLeft:'auto', display:'flex', alignItems:'center', gap:8, background:`${G}10`, border:`1px solid ${G}30`, borderRadius:99, padding:'5px 14px' }}>
            <span style={{ width:8, height:8, borderRadius:'50%', background:G, display:'inline-block' }} />
            <span style={{ fontSize:12, fontWeight:700, color:G }}>Partner Program Open</span>
          </div>
        </div>
      </div>

      <StepBar step={step} />

      <div style={{ maxWidth:1000, margin:'0 auto', padding:'36px 24px 80px' }}>
        <AnimatePresence mode="wait">
          {step===0 && <StoreInfoStep key="s0" onNext={handleStoreNext} />}
          {step===1 && <CategoriesStep key="s1" onNext={handleCatsNext} onBack={()=>{setStep(0);window.scrollTo(0,0);}} />}
          {step===2 && <BusinessStep key="s2" onNext={handleBizNext} onBack={()=>{setStep(1);window.scrollTo(0,0);}} />}
          {step===3 && <SuccessStep key="s3" storeData={storeData} categories={categories} />}
        </AnimatePresence>
      </div>
    </div>
  );
}
