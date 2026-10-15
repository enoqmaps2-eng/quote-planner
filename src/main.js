import "./style.css";
(function () {
  var KEY = "bedrock-quote-planner-v1";
  var CREDIT0 = 13260;

  // First quote, copied from Change Request CO_2 (Oct 5, 2026). Line numbers match the PDF.
  var ORIGINAL = [
    {id:1, cat:"Appliances", name:"Refrigerator", qty:1, rate:3420, desc:"Samsung Stainless Steel Bespoke Fridge, RF29BB8600QLAA.\nTo be selected with the wall oven, microwave combo.", overlap:{ids:[7], msg:"Package 3 (#7) includes this same fridge"}},
    {id:2, cat:"Appliances", name:"Dishwasher", qty:1, rate:1430, desc:"Samsung Stainless Steel Dishwasher, DW80B6060US.\nTo be selected with the wall oven, microwave combo.", overlap:{ids:[7], msg:"Package 3 (#7) includes this same dishwasher"}},
    {id:3, cat:"Appliances", name:"Adjust cabinets for future built-in microwave with trim kit", qty:-1, rate:880, credit:true, desc:"Adjust lower base cabinet to accommodate a future built-in microwave with trim kit. Adds electrical outlet required.\nDoes not include microwave or trim kit, these are purchased on a separate line item.\nIndicate on plan where the future microwave is to be placed. Must be in a lower base cabinet.\nOnly accepted if the wall oven and microwave combo cabinetry adjustments are approved (Schedule B, Line 3).", needs:{ids:[12], msg:"Goes with the built-in cabinet change (#12)"}},
    {id:4, cat:"Appliances", name:"Samsung Double Wall Oven Combo 30\" Convection", qty:1, rate:6855, desc:"NQ70CG700DSRAA, stainless steel.\nDoes not include electrical or cabinet adjustments for built-in appliances. Those are selected from the price book in conjunction with this change.", needs:{ids:[12], msg:"Needs the built-in cabinet/electrical change (#12)"}, overlap:{ids:[7], msg:"Package 3 (#7) already includes a range"}},
    {id:5, cat:"Appliances", name:"Built-in Microwave Stainless Steel with Trim Kit", qty:1, rate:830, desc:"Samsung 1.9 cu.ft built-in microwave with trim kit, MS19DG8500SRAC/MA-TK8020TS. Includes supply and installation.\nDoes not include cabinet adjustments or electrical. Those are added on a separate line item.", needs:{ids:[12], msg:"Needs the built-in cabinet/electrical change (#12)"}, overlap:{ids:[7], msg:"Package 3 (#7) already includes an OTR microwave"}},
    {id:6, cat:"Appliances", name:"Samsung 30\" Electric Cooktop", qty:1, rate:1320, desc:"NZ30FG5332RKAA, black.\nDoes not include cabinetry required for built-in appliances. Cabinet changes must be selected in conjunction with this change.", needs:{ids:[12], msg:"Needs the built-in cabinet change (#12)"}, overlap:{ids:[7], msg:"Package 3 (#7) already includes a range"}},
    {id:7, cat:"Appliances", name:"Appliance Package 3", qty:1, rate:3795, desc:"Samsung Fridge RF29BB8600QLAA, 36\" W, 28.8 cu ft, French door, bev center, SS, no panels.\nSamsung Range NSE80H63SRAC, 30\" W, electric, convection, single oven, SS.\nSamsung Microwave ME11A7510DS, OTR, 1.10 cu ft, low profile, SS.\nSamsung Dishwasher DW80B6060US, 24\" W, 44dB, 3rd rack, SS.\nIncludes delivery and install.", overlap:{ids:[1,2,4,5,6], msg:"Package 3 already has a fridge, range, microwave and dishwasher"}},
    {id:8, cat:"Appliances", name:"Washer/Dryer Pair in Black - Steam", qty:1, rate:3070, desc:"Samsung Washer/Dryer pair in black with steam: WF50BG8300AVUS / DVE50BG8300VAC."},
    {id:9, cat:"Appliances", name:"Chimney hoodfan - Broan 30\" Stainless Steel, 400 CFM", qty:1, rate:1355, desc:"EWS1306SS. Upgrade OTR microwave to 30\" chimney hoodfan. Includes hoodfan and install.\nCabinet adjustment required, to be added as a separate item from the price book."},
    {id:10, cat:"Blinds", name:"Add Blinds", qty:1, rate:0, desc:"Sunblinds, honeycomb standard, light filtering, SBHC002 white, cordless. Bedroom, Great Room, Bonus Room, Bathroom, Bedroom #3, Bedroom #2, Primary Bedroom, Ensuite.\nSunblinds, honeycomb standard, light filtering, SBHC002 white, cord and shroud. Kitchen (Patio).\nBlinds are selected and purchased at the IDS appointment. May not be installed before possession on quick possession homes.\nPriced at $0.00 on the quote, so edit the rate once you know the real cost."},
    {id:11, cat:"Cabinets", name:"Spice Rack", qty:1, rate:225, desc:"Add a wood spice tray/rack to a kitchen cabinet drawer.\nLocation: right side of the range."},
    {id:12, cat:"Cabinets", name:"Built-in Wall Oven, Microwave and Cooktop - Cabinets (front drive models only)", qty:1, rate:4760, desc:"Adjust the standard kitchen cabinet layout to accommodate future built-in wall oven, microwave and cooktop.\n33\" built-in wall oven and microwave cabinet at the end of the range wall run, with 1 drawer below the oven and 1 cabinet above the microwave. 30\" built-in cooktop cabinet at the range location with 2 pot & pan drawers below.\nIncludes electrical requirements, cabinet, countertop and backsplash adjustments.\nDoes not change the overall length of the cabinet run. Does not include appliances or credit for standard appliances.\nAll built-in appliances must be purchased from Bedrock Homes and installed before possession."},
    {id:13, cat:"Cabinets", name:"Cabinetry Door Style", qty:1, rate:4835, desc:"Upgrade cabinetry door style from Flat Slab to Shaker."},
    {id:14, cat:"Cabinets", name:"Glass Inserts", qty:1, rate:405, desc:"Add glass inserts to the two upper cabinets on both sides closest to the chimney hoodfan. Includes shaker door style to accommodate glass inserts. Interior of these cabinets changed to match the exterior. Selection: Satin Cosmo, Thermofoil.", needs:{ids:[13], msg:"Needs Shaker door style (#13)"}},
    {id:15, cat:"Cabinets", name:"Utensil Tray", qty:1, rate:225, desc:"Add utensil tray to the left of the range."},
    {id:16, cat:"Cabinets", name:"Cutlery Tray", qty:1, rate:300, desc:"Add a wood cutlery tray to a kitchen cabinet drawer.\nLocation: drawer beside the tall cabinet."},
    {id:17, cat:"Cabinets", name:"Slide Out Double Waste Bin - 18\" Cabinet", qty:1, rate:1175, desc:"Add slide out double waste bin to an existing 18\" wide kitchen cabinet. Includes 2 x 35 litre grey plastic waste bins, grey metal slide out hardware and bin holder.\nOnly works on 18\" wide cabinets. A different size needs an additional price request.\nLocation: kitchen island, on the end."},
    {id:18, cat:"Cabinets", name:"Microwave Tower", qty:1, rate:870, desc:"Modify tall pantry cabinet to be a microwave tower. Cabinet adjustments added on Schedule B, Line 3."},
    {id:19, cat:"Cabinets", name:"Pot and pan drawers", qty:2, rate:400, desc:"Revise standard lower kitchen cabinet to have pot and pan drawers, for a cabinet between 24\" and 36\" wide.\nLocation: both sides of the range."},
    {id:20, cat:"Carpet", name:"Carpet Underlay - Option 2, 8lb Memory Foam with Moisture Barrier", qty:1210, unit:"sq ft", rate:0.70, desc:"Upgrade from standard carpet underlay to 8lb memory foam with moisture barrier."},
    {id:21, cat:"Carpet", name:"Tier 2 Carpet", qty:1210, unit:"sq ft", rate:5.40, desc:"Upgrade from standard to Tier 2 carpet, priced per sq ft."},
    {id:22, cat:"Countertops", name:"Tier 2 Quartz Countertops - Kitchen Perimeter", qty:1, rate:120, desc:"Upgrade from Tier 1 included quartz/granite selections, 1.25\" or 3cm product."},
    {id:23, cat:"Countertops", name:"Tier 2 Quartz Countertops - Kitchen Island", qty:1, rate:220, desc:"Upgrade from Tier 1 included quartz/granite selections, 1.25\" or 3cm product."},
    {id:24, cat:"Electrical", name:"GFI Plug on Separate Circuit", qty:2, rate:450, desc:"Add a GFI plug on a separate circuit with breaker.\nIf adding to a bathroom it must be a GFI plug. An extra outlet in a 2nd floor bedroom may also need an Arc Fault Breaker (separate charge in Global Options). Indicate the location on the plan.\nLocations: Main Bathroom and Main Floor Bathroom, right side of the toilet for a future bidet seat."},
    {id:25, cat:"Fireplace", name:"Fireplace Wall Detail", qty:1, rate:1930, desc:"Add a 12in deep wall directly under the dropped beam between the dinette and the great room on the exterior wall. Extend the fireplace boxout 4in for a total of a 10in deep boxout.\nAdd 6 painted MDF shelves, 3 on each side of the boxout, mounted at 24in, 42in and 60in AFF. Approximately 5ft 4in wide, 2in high and 8in deep. Painted Snow, 060A2638. See detail."},
    {id:26, cat:"Lighting", name:"Undercabinet LED Light - Kitchen", qty:1, rate:1230, desc:"Add undercabinet LED lighting. Includes 1 driver with LED strip light, up to 16 ft. LED white lights on one switch. Includes driver and light valence.\nLocation to be specified."},
    {id:27, cat:"Melamine Shelving", name:"White Melamine Shelving with Metal Rod", qty:89.5, unit:"LNFT", rate:20, desc:"Upgrade wire shelving to white melamine with metal rod, priced per LNFT. Includes metal rod below shelf."},
    {id:28, cat:"Melamine Shelving", name:"White Melamine Shelving", qty:74, unit:"LNFT", rate:20, desc:"Upgrade wire shelving to white melamine, priced per LNFT."},
    {id:29, cat:"Melamine Shelving", name:"White Melamine Cubbies with Rod", qty:1, rate:825, desc:"Add 2 white melamine cubbies with chrome rod above base cabinets in the laundry room."},
    {id:30, cat:"Miscellaneous", name:"Schluter Shelves", qty:1, rate:440, desc:"Add 2x Schluter shelves to the tiled shower in the ensuite. Brushed stainless steel, Wave. Corner across from plumbing wall, installed at 24in AFF and 48in AFF."},
    {id:32, cat:"Plumbing", name:"Moen Bidet Seat - EB1000", qty:3, rate:770, desc:"Upgrade to Moen Bidet Seat EB1000. Does not include electrical outlet.\nLocation: all bathrooms."},
    {id:33, cat:"Plumbing", name:"Laundry Sink", qty:1, rate:1400, desc:"Add laundry sink with faucet to laundry room. Includes waterlines, drains, stainless steel laundry sink, laundry faucet. Can only be added to the existing laundry room cabinet.\nLocation: right side of the base cabinets."},
    {id:34, cat:"Plumbing", name:"Tiled Shower walls with fiberglass base - 5' (Option 1)", qty:-1, rate:2200, credit:true, desc:"Upgrade 5' shower enclosure to a fiberglass base with tiled shower walls. Deletes fiberglass enclosure, includes tiled walls (stops 6\" from the ceiling), waterproofing, Tier 1 tile. 6 mil sliding glass door already included from previous option.\nShown as a credit of -1 on the quote."},
    {id:35, cat:"Plumbing", name:"Tiled Shower walls with tiled base - 5'", qty:1, rate:5025, desc:"Upgrade 5' shower enclosure to a fully tiled shower with tiled walls and tiled base. Deletes fiberglass enclosure. Adds Kerdi kit for base and walls with center drain. Includes Tier 1 tiled walls (stops 6\" from the ceiling), Tier 1 mosaic tile for the shower base, waterproofing. 6 mil sliding glass door already included."},
    {id:36, cat:"Wall Tile", name:"Niche to Shower", qty:1, rate:750, desc:"Add niche to tiled shower stall, approximately 14inH x 14inW, on the wall across from the plumbing wall.\nTiled shower stall option must be selected with this option. Cannot be installed on an exterior wall. Does not include wall dimension changes.", needs:{ids:[34,35], any:true, msg:"Needs a tiled shower option (#34 or #35)"}}
  ].map(function (o) { o.on = true; return o; });

  var CAT_ORDER = ["Appliances","Blinds","Cabinets","Carpet","Countertops","Electrical","Fireplace","Lighting","Melamine Shelving","Miscellaneous","Plumbing","Wall Tile"];

  function clone(a) { return JSON.parse(JSON.stringify(a)); }
  function amt(it) { return (Number(it.qty) || 0) * (Number(it.rate) || 0); }
  var cad = new Intl.NumberFormat("en-CA", { style: "currency", currency: "CAD" });
  function fmt(n) { return cad.format(Math.round(n * 100) / 100); }

  var state = { credit: CREDIT0, gst: false, nextId: 100, items: clone(ORIGINAL) };
  try {
    var saved = JSON.parse(localStorage.getItem(KEY) || "null");
    if (saved && Array.isArray(saved.items)) {
      var byId = {}; ORIGINAL.forEach(function (o) { byId[o.id] = o; });
      // keep rule text (needs/overlap) from code, user values from storage
      saved.items.forEach(function (s) { if (byId[s.id]) { s.needs = byId[s.id].needs; s.overlap = byId[s.id].overlap; } });
      state = saved;
    }
  } catch (e) {}
  function save() { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {} }

  var firstSub = ORIGINAL.reduce(function (s, it) { return s + amt(it); }, 0);
  var firstOwed = firstSub - CREDIT0; // 45,131.00 on the PDF

  var filter = "all", query = "", open = {};
  var $ = function (id) { return document.getElementById(id); };
  var listEl = $("list");

  function itemById(id) { return state.items.find(function (i) { return i.id === id; }); }
  function isOn(id) { var i = itemById(id); return !!(i && i.on); }

  function warnings(it) {
    if (!it.on) return [];
    var out = [];
    if (it.needs) {
      var ok = it.needs.any ? it.needs.ids.some(isOn) : it.needs.ids.every(isOn);
      if (!ok) out.push(it.needs.msg + " is cut");
    }
    if (it.overlap) {
      var also = it.overlap.ids.filter(function (i) { return isOn(i); });
      if (also.length) out.push(it.overlap.msg + ". Also kept: " + also.map(function (i) { return "#" + i; }).join(", "));
    }
    return out;
  }

  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]; }); }

  function visible(it) {
    if (filter === "on" && !it.on) return false;
    if (filter === "off" && it.on) return false;
    if (query) { var q = query.toLowerCase(); if ((it.name + " " + it.desc + " " + it.cat).toLowerCase().indexOf(q) < 0) return false; }
    return true;
  }

  function render() {
    var cats = CAT_ORDER.slice();
    state.items.forEach(function (i) { if (cats.indexOf(i.cat) < 0) cats.push(i.cat); });
    var html = "", shown = 0;
    cats.forEach(function (c) {
      var all = state.items.filter(function (i) { return i.cat === c; });
      var rows = all.filter(visible);
      if (!rows.length) return;
      shown += rows.length;
      var sub = all.reduce(function (s, i) { return s + (i.on ? amt(i) : 0); }, 0);
      html += '<section class="cat"><div class="cat-head"><h2>' + esc(c) + '</h2>' +
        '<span class="sub" data-cat-sub="' + esc(c) + '">' + fmt(sub) + '</span>' +
        '<button type="button" class="btn small" data-bulk="keep" data-cat="' + esc(c) + '">Keep all</button>' +
        '<button type="button" class="btn small" data-bulk="cut" data-cat="' + esc(c) + '">Cut all</button></div><div class="items">';
      rows.forEach(function (it) {
        var w = warnings(it);
        var isOpen = !!open[it.id];
        var total = amt(it);
        html += '<div class="item ' + (it.on ? "" : "off") + '" data-id="' + it.id + '">' +
          '<div class="sw"><label class="switch"><input type="checkbox" data-act="toggle" ' + (it.on ? "checked" : "") + ' aria-label="Keep ' + esc(it.name) + '"><i></i></label></div>' +
          '<div class="main"><div class="name"><span class="ln">' + (it.custom ? "NEW" : "#" + it.id) + '</span>' + esc(it.name) + '</div>' +
          '<div class="tags">' + (it.credit ? '<span class="tag credit">Credit line</span>' : '') +
          w.map(function (m) { return '<span class="tag warn">Check: ' + esc(m) + '</span>'; }).join("") + '</div>' +
          (it.desc ? '<button type="button" class="more" data-act="more" aria-expanded="' + isOpen + '">' + (isOpen ? "Hide details" : "Details") + '</button>' +
          (isOpen ? '<p class="desc">' + esc(it.desc) + '</p>' : '') : '') + '</div>' +
          '<div class="tot num ' + (total < 0 ? "neg" : "") + '" data-tot>' + fmt(total) + '</div>' +
          '<div class="ctl"><label>Qty <input class="q" type="number" step="any" data-act="qty" value="' + it.qty + '" aria-label="Quantity for ' + esc(it.name) + '"></label>' +
          (it.unit ? '<span>' + esc(it.unit) + '</span>' : '') + '<span>×</span>' +
          '<label>$ <input type="number" step="any" data-act="rate" value="' + it.rate + '" aria-label="Rate for ' + esc(it.name) + '"></label>' +
          (it.custom ? '<button type="button" class="btn small danger x" data-act="del">Delete</button>' : '') + '</div></div>';
      });
      html += '</div></section>';
    });
    if (!shown) html = '<div class="empty">Nothing matches. Change the filter or search.</div>';
    listEl.innerHTML = html;
    var dl = $("catList"); dl.innerHTML = cats.map(function (c) { return '<option value="' + esc(c) + '">'; }).join("");
    totals();
  }

  function totals() {
    var on = state.items.filter(function (i) { return i.on; });
    var sub = on.reduce(function (s, i) { return s + amt(i); }, 0);
    var credit = Number(state.credit) || 0;
    var rem = credit - sub;
    var owe = rem < 0 ? -rem : 0;
    var gst = state.gst ? owe * 0.05 : 0;
    var over = rem < 0;

    $("balance").className = "balance " + (over ? "over" : "ok");
    $("balLabel").textContent = over ? "Over your credit by" : "Credit remaining";
    $("balValue").textContent = fmt(Math.abs(rem));
    var bar = $("bar"); bar.className = "bar" + (over ? " over" : "");
    var pct = credit > 0 ? Math.min(100, Math.max(0, sub / credit * 100)) : (sub > 0 ? 100 : 0);
    bar.firstElementChild.style.width = pct + "%";
    $("sCount").textContent = on.length + " of " + state.items.length;
    $("sSub").textContent = fmt(sub);
    $("sCred").textContent = fmt(-credit);
    $("gstRow").hidden = !state.gst;
    $("sGst").textContent = fmt(gst);
    $("owedLabel").textContent = over ? "Amount owed" : "Amount owed (credit covers it)";
    $("sOwed").textContent = fmt(owe + gst);
    $("oOwed").textContent = fmt(firstOwed);
    var diff = firstOwed - owe;
    $("oSaved").textContent = diff > 0 ? "You have cut " + fmt(diff) + " from what you owed." : (diff < 0 ? "You are " + fmt(-diff) + " above the first quote." : "Same as the first quote.");
    var mb = $("mbar"); mb.className = "mbar " + (over ? "over" : "ok");
    $("mLabel").textContent = over ? "Over credit by" : "Credit remaining";
    $("mValue").textContent = fmt(Math.abs(rem));
    $("mCount").textContent = on.length + " of " + state.items.length + " kept";

    // live line totals and category subtotals (without re-rendering inputs)
    listEl.querySelectorAll(".item").forEach(function (row) {
      var it = itemById(Number(row.dataset.id) || row.dataset.id); if (!it) return;
      var t = row.querySelector("[data-tot]"); var a = amt(it);
      t.textContent = fmt(a); t.classList.toggle("neg", a < 0);
    });
    listEl.querySelectorAll("[data-cat-sub]").forEach(function (el) {
      var c = el.getAttribute("data-cat-sub");
      el.textContent = fmt(state.items.filter(function (i) { return i.cat === c && i.on; }).reduce(function (s, i) { return s + amt(i); }, 0));
    });
  }

  function rowItem(el) { var r = el.closest(".item"); if (!r) return null; var raw = r.dataset.id; return itemById(isNaN(raw) ? raw : Number(raw)); }

  listEl.addEventListener("change", function (e) {
    var it = rowItem(e.target); if (!it) return;
    if (e.target.dataset.act === "toggle") { it.on = e.target.checked; save(); render(); }
  });
  listEl.addEventListener("input", function (e) {
    var it = rowItem(e.target); if (!it) return;
    var a = e.target.dataset.act;
    if (a === "qty") { it.qty = e.target.value === "" ? 0 : Number(e.target.value); save(); totals(); }
    if (a === "rate") { it.rate = e.target.value === "" ? 0 : Number(e.target.value); save(); totals(); }
  });
  listEl.addEventListener("click", function (e) {
    var b = e.target.closest("button"); if (!b) return;
    if (b.dataset.bulk) {
      var on = b.dataset.bulk === "keep";
      state.items.forEach(function (i) { if (i.cat === b.dataset.cat) i.on = on; });
      save(); render(); return;
    }
    var it = rowItem(b); if (!it) return;
    if (b.dataset.act === "more") { open[it.id] = !open[it.id]; render(); }
    if (b.dataset.act === "del") { state.items = state.items.filter(function (i) { return i !== it; }); save(); render(); }
  });

  $("credit").value = state.credit;
  $("credit").addEventListener("input", function (e) { state.credit = e.target.value === "" ? 0 : Number(e.target.value); save(); totals(); });
  $("gstOn").checked = !!state.gst;
  $("gstOn").addEventListener("change", function (e) { state.gst = e.target.checked; save(); totals(); });

  document.querySelectorAll("[data-filter]").forEach(function (b) {
    b.addEventListener("click", function () {
      filter = b.dataset.filter;
      document.querySelectorAll("[data-filter]").forEach(function (x) { x.setAttribute("aria-pressed", String(x === b)); });
      render();
    });
  });
  $("search").addEventListener("input", function (e) { query = e.target.value.trim(); render(); });

  // add item
  var addForm = $("addForm");
  function setAdd(show) { addForm.hidden = !show; $("addToggle").setAttribute("aria-expanded", String(show)); if (show) $("fName").focus(); }
  $("addToggle").addEventListener("click", function () { setAdd(addForm.hidden); });
  $("addCancel").addEventListener("click", function () { setAdd(false); });
  addForm.addEventListener("submit", function (e) {
    e.preventDefault();
    var qty = $("fQty").value === "" ? 1 : Number($("fQty").value);
    state.items.push({ id: "c" + (state.nextId++), custom: true, on: true, cat: $("fCat").value.trim() || "Miscellaneous",
      name: $("fName").value.trim(), qty: qty, rate: Number($("fRate").value) || 0, unit: $("fUnit").value, desc: $("fDesc").value.trim() });
    addForm.reset(); $("fQty").value = 1; setAdd(false); save(); render();
  });

  // reset (two taps)
  var armed = null;
  $("resetBtn").addEventListener("click", function () {
    var b = $("resetBtn");
    if (!armed) {
      b.textContent = "Tap again to reset everything"; b.classList.add("armed");
      armed = setTimeout(disarm, 4000); return;
    }
    disarm();
    state = { credit: CREDIT0, gst: false, nextId: 100, items: clone(ORIGINAL) };
    $("credit").value = state.credit; $("gstOn").checked = false; open = {};
    save(); render();
  });
  function disarm() { clearTimeout(armed); armed = null; var b = $("resetBtn"); b.textContent = "Reset to first quote"; b.classList.remove("armed"); }

  // share summary
  function summaryText() {
    var on = state.items.filter(function (i) { return i.on; });
    var off = state.items.filter(function (i) { return !i.on; });
    var sub = on.reduce(function (s, i) { return s + amt(i); }, 0);
    var credit = Number(state.credit) || 0, rem = credit - sub;
    var L = ["UPGRADE QUOTE - Change Request CO_2", ""];
    L.push("Credit: " + fmt(credit));
    L.push("Selected upgrades: " + fmt(sub));
    L.push(rem >= 0 ? "Credit remaining: " + fmt(rem) : "Amount owed: " + fmt(-rem) + (state.gst ? " + est. GST " + fmt(-rem * 0.05) : ""));
    L.push("", "KEEPING (" + on.length + ")");
    on.forEach(function (i) { L.push("- " + (i.custom ? "" : "#" + i.id + " ") + i.name + (i.qty !== 1 ? " (" + i.qty + (i.unit ? " " + i.unit : "") + " x " + fmt(i.rate) + ")" : "") + ": " + fmt(amt(i)) ); });
    L.push("", "CUT (" + off.length + ")");
    off.forEach(function (i) { L.push("- " + (i.custom ? "" : "#" + i.id + " ") + i.name + ": " + fmt(amt(i))); });
    return L.join("\n");
  }
  $("shareBtn").addEventListener("click", function () {
    var box = $("shareBox");
    if (box.hidden) { $("shareText").value = summaryText(); box.hidden = false; $("shareText").select(); } else { box.hidden = true; }
    $("copyMsg").textContent = "";
  });
  $("copyBtn").addEventListener("click", function () {
    var ta = $("shareText"); ta.value = summaryText(); ta.select();
    var done = function () { $("copyMsg").textContent = "Copied"; };
    var fail = function () { $("copyMsg").textContent = "Press Ctrl/Cmd+C to copy"; };
    try { navigator.clipboard.writeText(ta.value).then(done, fail); } catch (e) { fail(); }
  });

  render();
})();
