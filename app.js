/* ==========================================
   G4S ORDER MANAGEMENT APPSCRIPT
   Reactivity, Mock Data, and Wizard Flow Logic
   ========================================== */

// 1. Mock Database
const DATABASE = {
  customers: {
    sutton: {
      name: "Test Customer Sutton",
      contract: "3429548",
      sites: [
        { id: "NEWCA001", name: "Newcastle Eldon Square (2065) [NEWCA001]" },
        { id: "BULLR001", name: "Birmingham (2004) [BULLR001]" },
        { id: "BLUEW001", name: "Batterser (4004) [BLUEW001]" },
        { id: "SUTT001", name: "Sutton High Street (1014) [SUTT001]" }
      ],
      users: [
        "accounting.customers.gb@swarovski.com",
        "manager.sutton@swarovski.com",
        "billing.sutton@swarovski.com"
      ]
    },
    preston: {
      name: "Preston Retail Group",
      contract: "1287459",
      sites: [
        { id: "PRES001", name: "Preston Town Centre (1102) [PRES001]" },
        { id: "DEEP002", name: "Preston Deepdale (1150) [DEEP002]" }
      ],
      users: [
        "billing.preston@retail.co.uk",
        "ops.preston@retail.co.uk"
      ]
    },
    swarovski: {
      name: "Swarovski GB Ltd",
      contract: "8739401",
      sites: [
        { id: "BLEW001", name: "Bluewater (2004) [BLEW001]" },
        { id: "CENTRO01", name: "Swarovski Bury ly (59) [CENTRO01]" },
        { id: "BRIDG001", name: "Bridgend (1177) [BRIDG001]" },
        { id: "CARDIOSS", name: "LG12 Cardiff St Davids 2 (7) [CARDIOSS]" }
      ],
      users: [
        "accounting.customers.gb@swarovski.com",
        "finance.swarovski@swarovski.com"
      ]
    },
    birmingham: {
      name: "Birmingham Mall Services",
      contract: "3429548",
      sites: [
        { id: "CIRCU001", name: "Battersee (487) [CIRCU001]" },
        { id: "GRAND01", name: "Birmingham Grand Central (501) [GRAND01]" }
      ],
      users: [
        "birmingham.mall@services.com",
        "admin.birmingham@services.com"
      ]
    }
  },

  productDenominations: {
    coin: [
      { name: "Loose Cash - 5", unitValue: 5.00 },
      { name: "50p - Sachet (£10)", unitValue: 10.00 },
      { name: "10p - Sachet (£5)", unitValue: 5.00 },
      { name: "5p - Sachet (£5)", unitValue: 5.00 },
      { name: "2p - Sachet (£1)", unitValue: 1.00 },
      { name: "1p - Sachet (£1)", unitValue: 1.00 }
    ],
    notes: [
      { name: "£1 - Sachet (£20)", unitValue: 20.00 },
      { name: "£2 - Sachet (£20)", unitValue: 20.00 },
      { name: "£5 Note Bundle (£100)", unitValue: 100.00 },
      { name: "£10 Note Bundle (£200)", unitValue: 200.00 },
      { name: "£20 - Sachet (£400)", unitValue: 400.00 },
      { name: "£50 Note Bundle (£1000)", unitValue: 1000.00 }
    ]
  },

  ongoingOrders: [
    {
      orderId: "6333805",
      customerKey: "sutton",
      siteName: "Newcastle Eldon Square (2065) [NEWCA001]",
      createdDate: "2026-06-01 13:10:06",
      requestedDelivery: "2026-06-09",
      requestedBy: "manager.sutton@swarovski.com",
      orderStatus: "notified",
      totalValue: 200.00,
      standingOrder: true,
      items: [
        { product: "Loose Cash - 5", value: 5.00, quantity: 10, total: 50.00 },
        { product: "£1 - Sachet (£20)", value: 20.00, quantity: 5, total: 100.00 },
        { product: "50p - Sachet (£10)", value: 10.00, quantity: 2, total: 20.00 },
        { product: "50p - Sachet (£10)", value: 10.00, quantity: 2, total: 20.00 },
        { product: "10p - Sachet (£5)", value: 5.00, quantity: 1, total: 5.00 },
        { product: "5p - Sachet (£5)", value: 5.00, quantity: 1, total: 5.00 }
      ]
    },
    {
      orderId: "6331524",
      customerKey: "sutton",
      siteName: "Birmingham (2004) [BULLR001]",
      createdDate: "2026-06-04 03:31:19",
      requestedDelivery: "2026-06-09",
      requestedBy: "accounting.customers@swarovski",
      orderStatus: "notified",
      totalValue: 200.00,
      standingOrder: false,
      items: [
        { product: "£10 Note Bundle (£200)", value: 200.00, quantity: 1, total: 200.00 }
      ]
    }
  ],

  historyOrders: [
    {
      orderId: "328a752",
      customerKey: "sutton",
      customerName: "Test Customer Sutton",
      siteName: "Newcastle Eldon Square (2065) [NEWCA001]",
      requestedDelivery: "2026-01-29",
      createdDate: "2026-01-29",
      orderStatus: "Complete",
      totalValue: 4000.00,
      items: [
        { product: "£20 - Sachet (£400)", value: 400.00, quantity: 10, total: 4000.00 }
      ]
    },
    {
      orderId: "328a757",
      customerKey: "sutton",
      customerName: "Test Customer Sutton",
      siteName: "Birmingham (2004) [BULLR001]",
      requestedDelivery: "2026-01-29",
      createdDate: "2026-01-29",
      orderStatus: "Complete",
      totalValue: 4000.00,
      items: [
        { product: "£20 - Sachet (£400)", value: 400.00, quantity: 10, total: 4000.00 }
      ]
    },
    {
      orderId: "328a758",
      customerKey: "sutton",
      customerName: "Test Customer Sutton",
      siteName: "Batterser (4004) [BLUEW001]",
      requestedDelivery: "2026-01-29",
      createdDate: "2026-01-29",
      orderStatus: "Complete",
      totalValue: 4000.00,
      items: [
        { product: "£20 - Sachet (£400)", value: 400.00, quantity: 10, total: 4000.00 }
      ]
    },
    {
      orderId: "328a709",
      customerKey: "sutton",
      customerName: "Test Customer Sutton",
      siteName: "Birmingham (2004) [BULLR001]",
      requestedDelivery: "2026-01-29",
      createdDate: "2026-01-29",
      orderStatus: "Complete",
      totalValue: 4000.00,
      items: [
        { product: "£2 - Sachet (£20)", value: 20.00, quantity: 1, total: 4000.00 }
      ]
    }
  ]
};

// 2. Application State Variables
let state = {
  currentView: 'bag-orders', 
  currentTab: 'new-order', 
  selectedCustomer: 'sutton', 
  selectedOngoingOrder: null,
  selectedHistoryOrder: null,

  // Wizard state variables
  wizardStep: 1, 
  selectedSites: [], 
  calendarYear: 2026,
  calendarMonth: 5, 
  selectedDeliveryDate: '', 
  isAdditionalService: false,

  // Denominations breakdown builder state
  newOrderBreakdown: [],
  excelFilePath: '',
  ongoingSort: { column: 'orderId', direction: 'desc' },
  historySort: { column: 'orderId', direction: 'desc' },
  ongoingFilterQuery: '',
  historyFilters: {
    orderId: '',
    siteBy: 'id',
    term: '',
    from: '',
    to: ''
  },
  historyPage: 1,
  historyRowsPerPage: 5
};

const CREDIT_LIMIT = 4000.00;

// Regular service schedule: Tuesday & Thursday (day indices 2 and 4)
const SERVICE_SCHEDULE_DAYS = [2, 4];

// 3. Initializer & Event Setup
document.addEventListener("DOMContentLoaded", () => {
  lucide.createIcons();

  // Initial customer dropdown sync
  const customerDropdown = document.getElementById('customer-dropdown');
  if (customerDropdown) {
    customerDropdown.value = state.selectedCustomer;
  }

  // Populate first steps data
  populateSitesListbox();
  renderSelectedSitesTable();
  renderCalendarGrid();

  // Populate other sections
  renderOngoingOrdersTable();
  renderHistoryOrdersTable();

  // Setup tab routing & sidebar
  setupSidebarNavigation();
  setupSubtabNavigation();
  setupCustomerSelector();

  // Setup multi-step wizard controllers
  setupWizardControls();

  // Ongoing Orders / History View handlers
  setupOngoingOrdersHandlers();
  setupHistoryFiltersHandlers();

  // Form Adding Items handlers
  setupNewOrderHandlers();

  // Launch initial tab
  triggerTab(state.currentTab);

  // System Time Updater
  setInterval(updateSystemTime, 30000);
  updateSystemTime();
});

// Update standard Header System Time
function updateSystemTime() {
  const timeEl = document.getElementById('system-time');
  if (timeEl) {
    const now = new Date();
    const formatted = now.getFullYear() + '-' + 
      String(now.getMonth() + 1).padStart(2, '0') + '-' + 
      String(now.getDate()).padStart(2, '0') + ' ' + 
      String(now.getHours()).padStart(2, '0') + ':' + 
      String(now.getMinutes()).padStart(2, '0');
    timeEl.textContent = formatted;
  }
}

// 4. Toast Notification Engine
function showToast(message, type = 'success') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  
  let icon = 'check-circle';
  if (type === 'error') icon = 'x-circle';
  if (type === 'warning') icon = 'alert-triangle';

  toast.innerHTML = `
    <i data-lucide="${icon}"></i>
    <div class="toast-message">${message}</div>
    <button class="toast-close">&times;</button>
  `;

  container.appendChild(toast);
  lucide.createIcons({ attrs: { class: 'inline-icon' } });

  const closeToast = () => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(20px) scale(0.9)';
    setTimeout(() => {
      if (toast.parentNode) {
        container.removeChild(toast);
      }
    }, 300);
  };

  toast.querySelector('.toast-close').addEventListener('click', closeToast);
  setTimeout(closeToast, 4000);
}

// ==========================================
// 5. MULTI-STEP WIZARD ENGINE
// ==========================================
function setupWizardControls() {
  // Move site from left listbox to right selected table
  document.getElementById('btn-move-site-right').addEventListener('click', () => {
    const listbox = document.getElementById('wizard-site-list');
    const selectedOpt = listbox.options[listbox.selectedIndex];
    
    if (!selectedOpt) {
      showToast('Please select a site from the available list first.', 'error');
      return;
    }

    const siteId = selectedOpt.value;
    const siteName = selectedOpt.textContent;

    // Avoid duplicates
    if (state.selectedSites.some(s => s.id === siteId)) {
      showToast('This site has already been selected.', 'warning');
      return;
    }

    state.selectedSites.push({ id: siteId, name: siteName });
    renderSelectedSitesTable();
  });

  // Clear/remove all selected sites
  document.getElementById('btn-remove-all-sites').addEventListener('click', () => {
    if (state.selectedSites.length === 0) return;
    state.selectedSites = [];
    renderSelectedSitesTable();
    showToast('Cleared all selected sites.', 'warning');
  });

  // Step 1: Sites Selection Continue button
  document.getElementById('btn-sites-continue').addEventListener('click', () => {
    if (!state.selectedCustomer) {
      showToast('Please select a customer first.', 'error');
      return;
    }
    if (state.selectedSites.length === 0) {
      showToast('Please select at least one site to continue.', 'error');
      return;
    }

    // Go to calendar
    setWizardStep(2);
  });

  // Calendar Back Button
  document.getElementById('btn-calendar-prev-step').addEventListener('click', () => {
    setWizardStep(1);
  });

  // Calendar Month Toggles
  document.getElementById('btn-cal-prev').addEventListener('click', () => {
    state.calendarMonth--;
    if (state.calendarMonth < 0) {
      state.calendarMonth = 11;
      state.calendarYear--;
    }
    renderCalendarGrid();
  });

  document.getElementById('btn-cal-next').addEventListener('click', () => {
    state.calendarMonth++;
    if (state.calendarMonth > 11) {
      state.calendarMonth = 0;
      state.calendarYear++;
    }
    renderCalendarGrid();
  });

  document.getElementById('btn-cal-today').addEventListener('click', () => {
    const now = new Date();
    state.calendarYear = now.getFullYear();
    state.calendarMonth = now.getMonth();
    renderCalendarGrid();
  });

  // Warning Modal Confirm button
  document.getElementById('btn-modal-confirm').addEventListener('click', () => {
    document.getElementById('non-schedule-modal').style.display = 'none';
    setWizardStep(3); // Proceed to Confirmation Panel
  });

  // Warning Modal Cancel button
  document.getElementById('btn-modal-cancel').addEventListener('click', () => {
    document.getElementById('non-schedule-modal').style.display = 'none';
    
    // Clear selection state
    state.selectedDeliveryDate = '';
    document.getElementById('required-date-display').value = '';
    renderCalendarGrid();
    showToast('Date selection cancelled.', 'warning');
  });

  // Step 3 (Confirmation): Previous Button
  document.getElementById('btn-confirm-prev-step').addEventListener('click', () => {
    setWizardStep(2);
  });

  // Step 3 (Confirmation): Confirm Button
  document.getElementById('btn-confirm-next-step').addEventListener('click', () => {
    const isChecked = document.getElementById('confirm-declaration-chk').checked;
    if (!isChecked) {
      showToast('Please check the declaration checkbox to confirm additional charges.', 'error');
      return;
    }

    // Proceed to Step 4 Denominations
    setWizardStep(4);
  });
}

function setWizardStep(stepNum) {
  state.wizardStep = stepNum;
  updateWizardProgressTracker();

  // Hide all panels
  document.getElementById('wizard-panel-sites').classList.remove('active-panel');
  document.getElementById('wizard-panel-calendar').classList.remove('active-panel');
  document.getElementById('wizard-panel-out-of-schedule').classList.remove('active-panel');
  document.getElementById('wizard-panel-denominations').classList.remove('active-panel');

  if (stepNum === 1) {
    document.getElementById('wizard-panel-sites').classList.add('active-panel');
  } else if (stepNum === 2) {
    document.getElementById('wizard-panel-calendar').classList.add('active-panel');
    renderCalendarSelectedSites();
  } else if (stepNum === 3) {
    document.getElementById('wizard-panel-out-of-schedule').classList.add('active-panel');
    populateConfirmationDetails();
  } else if (stepNum === 4) {
    document.getElementById('wizard-panel-denominations').classList.add('active-panel');
    loadDenominationsPreFilledFields();
  }
}

// Update wizard progress timeline circles
function updateWizardProgressTracker() {
  const steps = [1, 2, 3, 4];
  
  steps.forEach(s => {
    const stepEl = document.getElementById(`prog-step-${s}`);
    if (!stepEl) return;
    
    stepEl.classList.remove('active', 'completed');
    
    if (state.wizardStep === 1) {
      if (s === 1) stepEl.classList.add('active');
    } else if (state.wizardStep === 2) {
      if (s < 2) stepEl.classList.add('completed');
      if (s === 2) stepEl.classList.add('active');
    } else if (state.wizardStep === 3) {
      if (s < 3) stepEl.classList.add('completed');
      if (s === 3) stepEl.classList.add('active');
    } else if (state.wizardStep === 4) {
      if (s < 4) stepEl.classList.add('completed');
      if (s === 4) stepEl.classList.add('active');
    }
  });
}

// Populate Left Available Sites listbox
function populateSitesListbox() {
  const listbox = document.getElementById('wizard-site-list');
  if (!listbox) return;
  listbox.innerHTML = '';

  if (!state.selectedCustomer) {
    const opt = document.createElement('option');
    opt.disabled = true;
    opt.textContent = "Please select a customer first";
    listbox.appendChild(opt);
    return;
  }

  const sites = DATABASE.customers[state.selectedCustomer].sites;
  sites.forEach(site => {
    const opt = document.createElement('option');
    opt.value = site.id;
    opt.textContent = site.name;
    listbox.appendChild(opt);
  });

  // Load active contract code
  const contractSelect = document.getElementById('wizard-contract-select');
  if (contractSelect) {
    contractSelect.value = DATABASE.customers[state.selectedCustomer].contract;
  }
}

// Render Selected Sites table on Step 1
function renderSelectedSitesTable() {
  const tbody = document.getElementById('selected-sites-tbody');
  if (!tbody) return;
  tbody.innerHTML = '';

  if (state.selectedSites.length === 0) {
    tbody.innerHTML = `<tr class="empty-selection-row"><td colspan="2" class="center-text text-muted">No Site Selected</td></tr>`;
    return;
  }

  state.selectedSites.forEach((site, index) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>
        <div class="site-row-item">
          <span>${site.name}</span>
          <button type="button" class="btn-link text-danger font-size-12" data-index="${index}">&times; Remove</button>
        </div>
      </td>
    `;
    
    tr.querySelector('button').addEventListener('click', (e) => {
      const idx = parseInt(e.target.getAttribute('data-index'));
      state.selectedSites.splice(idx, 1);
      renderSelectedSitesTable();
    });

    tbody.appendChild(tr);
  });
}

// Render Calendar Month Grid dynamically
function renderCalendarGrid() {
  const grid = document.getElementById('calendar-grid-days');
  const monthYearEl = document.getElementById('calendar-month-year');
  if (!grid || !monthYearEl) return;

  grid.innerHTML = '';
  
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  monthYearEl.textContent = `${monthNames[state.calendarMonth]} ${state.calendarYear}`;

  const firstDayIndex = new Date(state.calendarYear, state.calendarMonth, 1).getDay();
  const numDays = new Date(state.calendarYear, state.calendarMonth + 1, 0).getDate();

  for (let i = 0; i < firstDayIndex; i++) {
    const empty = document.createElement('div');
    empty.className = 'calendar-day empty-day';
    grid.appendChild(empty);
  }

  for (let day = 1; day <= numDays; day++) {
    const cell = document.createElement('div');
    cell.className = 'calendar-day';
    
    const dateStr = `${state.calendarYear}-${String(state.calendarMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    if (state.selectedDeliveryDate === dateStr) {
      cell.classList.add('selected-day');
    }

    const dateObj = new Date(state.calendarYear, state.calendarMonth, day);
    const dayOfWeek = dateObj.getDay();

    const isService = SERVICE_SCHEDULE_DAYS.includes(dayOfWeek);
    if (isService) {
      cell.classList.add('service-day');
    }

    cell.innerHTML = `<span class="day-num">${String(day).padStart(2, '0')}</span>`;

    cell.addEventListener('click', () => {
      const cells = grid.querySelectorAll('.calendar-day');
      cells.forEach(c => c.classList.remove('selected-day'));
      cell.classList.add('selected-day');

      state.selectedDeliveryDate = dateStr;
      
      const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      const formattedInput = `${weekdays[dayOfWeek]} ${String(day).padStart(2, '0')}/${String(state.calendarMonth + 1).padStart(2, '0')}/${state.calendarYear}`;
      document.getElementById('required-date-display').value = formattedInput;

      if (isService) {
        state.isAdditionalService = false;
        showToast(`Selected scheduled delivery day: ${formattedInput}`);
        setWizardStep(4);
      } else {
        document.getElementById('non-schedule-modal').style.display = 'flex';
      }
    });

    grid.appendChild(cell);
  }
}

function renderCalendarSelectedSites() {
  const tbody = document.getElementById('calendar-selected-sites-tbody');
  if (!tbody) return;
  tbody.innerHTML = '';

  state.selectedSites.forEach(site => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td class="center-text"><span class="standing-order-check">&#10004;</span></td>
      <td>${site.name}</td>
    `;
    tbody.appendChild(tr);
  });
}

function populateConfirmationDetails() {
  const contract = DATABASE.customers[state.selectedCustomer]?.contract || "3429548";
  document.getElementById('confirm-contract-val').value = contract;
  
  const dateParts = state.selectedDeliveryDate.split('-');
  let displayDate = state.selectedDeliveryDate;
  if (dateParts.length === 3) {
    const dObj = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);
    const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    displayDate = `${weekdays[dObj.getDay()]} ${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;
  }
  document.getElementById('confirm-date-val').value = displayDate;
  document.getElementById('confirm-declaration-chk').checked = false;

  const tbody = document.getElementById('confirm-sites-tbody');
  tbody.innerHTML = '';
  state.selectedSites.forEach(site => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td class="center-text"><span class="standing-order-check">&#10004;</span></td>
      <td>${site.name}</td>
    `;
    tbody.appendChild(tr);
  });
}

function loadDenominationsPreFilledFields() {
  const siteNames = state.selectedSites.map(s => s.name).join(', ');
  document.getElementById('locked-site-display').value = siteNames;

  const dateParts = state.selectedDeliveryDate.split('-');
  let displayDate = state.selectedDeliveryDate;
  if (dateParts.length === 3) {
    displayDate = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;
  }
  document.getElementById('locked-date-display').value = displayDate;

  const warningBanner = document.getElementById('out-of-schedule-warning-banner');
  if (state.isAdditionalService) {
    warningBanner.style.display = 'flex';
  } else {
    warningBanner.style.display = 'none';
  }

  const userSelect = document.getElementById('order-user-select');
  if (userSelect) {
    userSelect.innerHTML = '<option value="" disabled selected>Select a user...</option>';
    const users = DATABASE.customers[state.selectedCustomer].users;
    users.forEach(user => {
      const opt = document.createElement('option');
      opt.value = user;
      opt.textContent = user;
      userSelect.appendChild(opt);
    });
  }
}

// ==========================================
// 6. GENERAL STATE CONTROLLERS & ROUTER
// ==========================================
function setupSidebarNavigation() {
  const items = document.querySelectorAll('.nav-item');
  const toggleBtn = document.getElementById('toggle-sidebar');
  const sidebar = document.getElementById('app-sidebar');

  if (toggleBtn && sidebar) {
    toggleBtn.addEventListener('click', () => {
      sidebar.classList.toggle('collapsed');
    });
  }

  items.forEach(item => {
    const link = item.querySelector('a');
    if (!link) return;

    link.addEventListener('click', (e) => {
      e.preventDefault();
      items.forEach(i => i.classList.remove('active'));
      
      const view = item.getAttribute('data-view');
      
      if (view === 'home') {
        item.classList.add('active');
        state.currentView = 'home';
        document.getElementById('view-home').style.display = 'block';
        document.getElementById('view-administration').style.display = 'none';
        document.getElementById('view-new-order').style.display = 'none';
        document.getElementById('view-history').style.display = 'none';
        document.getElementById('subtabs-bar').style.display = 'none';

        document.getElementById('breadcrumb-parent').textContent = 'Home Page';
        document.getElementById('breadcrumb-active').textContent = 'Dashboard';
        document.getElementById('page-title-main').textContent = 'My Home Page';
        document.getElementById('page-subtitle-main').textContent = 'Dashboard';
        
        updateHomeMetrics();
      } else if (view === 'bag-orders') {
        item.classList.add('active');
        state.currentView = 'bag-orders';
        document.getElementById('subtabs-bar').style.display = 'flex';
        document.getElementById('view-home').style.display = 'none';
        triggerTab(state.currentTab);
      } else {
        item.classList.add('active');
        state.currentView = 'placeholder';
        document.getElementById('subtabs-bar').style.display = 'none';
        document.getElementById('view-home').style.display = 'none';
        document.getElementById('view-administration').style.display = 'none';
        document.getElementById('view-new-order').style.display = 'none';
        document.getElementById('view-history').style.display = 'none';
        
        const viewText = item.querySelector('.nav-text').textContent;
        document.getElementById('breadcrumb-parent').textContent = viewText;
        document.getElementById('breadcrumb-active').textContent = 'Section';
        document.getElementById('page-title-main').textContent = viewText;
        document.getElementById('page-subtitle-main').textContent = 'Demo Placeholder';

        showToast(`${viewText} loaded (Demonstration Mode)`, 'warning');
      }
    });
  });
}

function setupSubtabNavigation() {
  const tabs = document.querySelectorAll('.tab-btn');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetTab = tab.getAttribute('data-tab');
      triggerTab(targetTab);
    });
  });
}

function triggerTab(tabName) {
  state.currentTab = tabName;
  
  const tabs = document.querySelectorAll('.tab-btn');
  tabs.forEach(t => {
    if (t.getAttribute('data-tab') === tabName) {
      t.classList.add('active');
    } else {
      t.classList.remove('active');
    }
  });

  document.getElementById('view-administration').style.display = 'none';
  document.getElementById('view-new-order').style.display = 'none';
  document.getElementById('view-history').style.display = 'none';

  const parent = document.getElementById('breadcrumb-parent');
  const active = document.getElementById('breadcrumb-active');
  const mainTitle = document.getElementById('page-title-main');

  if (tabName === 'administration') {
    document.getElementById('view-administration').style.display = 'grid';
    parent.textContent = 'Order Administration';
    active.textContent = 'Orders';
    mainTitle.textContent = 'Order Administration';
    renderOngoingOrdersTable();
  } else if (tabName === 'new-order') {
    document.getElementById('view-new-order').style.display = 'block';
    parent.textContent = 'Order Administration';
    active.textContent = 'New Order';
    mainTitle.textContent = 'New Order';
    
    setWizardStep(1);
    populateSitesListbox();
    renderSelectedSitesTable();
  } else if (tabName === 'history') {
    document.getElementById('view-history').style.display = 'block';
    parent.textContent = 'Order Administration';
    active.textContent = 'Order History';
    mainTitle.textContent = 'Order History';
    renderHistoryOrdersTable();
  }
}

function setupCustomerSelector() {
  const select = document.getElementById('customer-dropdown');
  const clearBtn = document.getElementById('clear-customer-btn');

  select.addEventListener('change', (e) => {
    state.selectedCustomer = e.target.value;
    clearBtn.style.display = 'block';
    
    showToast(`Active Customer Switched: ${DATABASE.customers[state.selectedCustomer].name}`);
    
    if (state.currentView === 'home') {
      updateHomeMetrics();
    }
    
    state.selectedOngoingOrder = null;
    clearOngoingOrderDetails();
    
    state.selectedSites = [];
    state.selectedDeliveryDate = '';
    document.getElementById('required-date-display').value = '';
    
    populateSitesListbox();
    renderSelectedSitesTable();
    renderCalendarGrid();
    renderOngoingOrdersTable();
    renderHistoryOrdersTable();
  });

  clearBtn.addEventListener('click', () => {
    select.value = '';
    state.selectedCustomer = '';
    clearBtn.style.display = 'none';
    
    showToast('Customer selection cleared.', 'warning');
    
    if (state.currentView === 'home') {
      updateHomeMetrics();
    }
    
    state.selectedOngoingOrder = null;
    clearOngoingOrderDetails();
    
    state.selectedSites = [];
    state.selectedDeliveryDate = '';
    document.getElementById('required-date-display').value = '';
    
    populateSitesListbox();
    renderSelectedSitesTable();
    renderCalendarGrid();
    renderOngoingOrdersTable();
    renderHistoryOrdersTable();
  });
}

function updateHomeMetrics() {
  const banner = document.getElementById('customer-warning-banner');
  const grid = document.getElementById('customer-data-grid');
  
  if (!state.selectedCustomer) {
    banner.style.display = 'flex';
    grid.style.display = 'none';
  } else {
    banner.style.display = 'none';
    grid.style.display = 'grid';
    
    const custData = DATABASE.customers[state.selectedCustomer];
    document.getElementById('metric-sites-count').textContent = custData.sites.length;
    
    const countOngoing = DATABASE.ongoingOrders.filter(o => o.customerKey === state.selectedCustomer).length;
    document.getElementById('metric-ongoing-count').textContent = countOngoing;
  }
}

// ==========================================
// 7. ONGOING ORDERS CONTROLLER (ORDER ADMIN)
// ==========================================
function setupOngoingOrdersHandlers() {
  const searchInput = document.getElementById('ongoing-search');
  searchInput.addEventListener('input', (e) => {
    state.ongoingFilterQuery = e.target.value.toLowerCase();
    renderOngoingOrdersTable();
  });

  const headers = document.querySelectorAll('#ongoing-orders-table th.sortable');
  headers.forEach(header => {
    header.addEventListener('click', () => {
      const colKey = header.getAttribute('data-sort');
      if (state.ongoingSort.column === colKey) {
        state.ongoingSort.direction = state.ongoingSort.direction === 'asc' ? 'desc' : 'asc';
      } else {
        state.ongoingSort.column = colKey;
        state.ongoingSort.direction = 'asc';
      }
      
      headers.forEach(h => {
        const icon = h.querySelector('.sort-icon');
        if (h.getAttribute('data-sort') === colKey) {
          icon.innerHTML = state.ongoingSort.direction === 'asc' ? '&#9652;' : '&#9662;';
        } else {
          icon.innerHTML = '&#9662;';
        }
      });

      renderOngoingOrdersTable();
    });
  });

  document.getElementById('btn-export-ongoing').addEventListener('click', () => {
    const list = getFilteredOngoingOrders();
    if (list.length === 0) {
      showToast('No orders to export.', 'error');
      return;
    }
    
    let csv = 'Order ID,Site Name,Created Date,Requested Delivery,Requested By,Order Status,Total Value\n';
    list.forEach(o => {
      csv += `"${o.orderId}","${o.siteName}","${o.createdDate}","${o.requestedDelivery}","${o.requestedBy}","${o.orderStatus}","£${o.totalValue.toFixed(2)}"\n`;
    });
    
    triggerCsvDownload(csv, 'G4S_Ongoing_Orders.csv');
  });

  document.getElementById('btn-edit-order').addEventListener('click', () => {
    if (!state.selectedOngoingOrder) {
      showToast('Please select an order to edit.', 'error');
      return;
    }
    showToast(`Order Edit Requested. Opening editor for Order #${state.selectedOngoingOrder.orderId} (Demo only)`, 'warning');
  });

  document.getElementById('btn-cancel-order').addEventListener('click', () => {
    if (!state.selectedOngoingOrder) {
      showToast('Please select an order to cancel.', 'error');
      return;
    }
    
    const confirmCancel = confirm(`Are you sure you want to Cancel Order ID: ${state.selectedOngoingOrder.orderId}?`);
    if (confirmCancel) {
      const order = DATABASE.ongoingOrders.find(o => o.orderId === state.selectedOngoingOrder.orderId);
      if (order) {
        order.orderStatus = 'cancelled';
        showToast(`Order #${order.orderId} was cancelled successfully.`, 'error');
        renderOngoingOrdersTable();
        loadOngoingOrderDetails(order);
      }
    }
  });
}

function getFilteredOngoingOrders() {
  let list = [...DATABASE.ongoingOrders];

  if (state.selectedCustomer) {
    list = list.filter(o => o.customerKey === state.selectedCustomer);
  }

  if (state.ongoingFilterQuery) {
    const q = state.ongoingFilterQuery;
    list = list.filter(o => 
      o.orderId.toLowerCase().includes(q) ||
      o.siteName.toLowerCase().includes(q) ||
      o.requestedBy.toLowerCase().includes(q) ||
      o.orderStatus.toLowerCase().includes(q)
    );
  }

  const col = state.ongoingSort.column;
  const dir = state.ongoingSort.direction;
  
  list.sort((a, b) => {
    let valA = a[col];
    let valB = b[col];

    if (col === 'totalValue') {
      valA = Number(valA);
      valB = Number(valB);
    } else {
      valA = String(valA).toLowerCase();
      valB = String(valB).toLowerCase();
    }

    if (valA < valB) return dir === 'asc' ? -1 : 1;
    if (valA > valB) return dir === 'asc' ? 1 : -1;
    return 0;
  });

  return list;
}

function renderOngoingOrdersTable() {
  const tbody = document.getElementById('ongoing-orders-tbody');
  if (!tbody) return;
  tbody.innerHTML = '';

  const list = getFilteredOngoingOrders();

  if (list.length === 0) {
    tbody.innerHTML = `<tr><td colspan="8" class="center-text">No ongoing orders found</td></tr>`;
    return;
  }

  list.forEach(order => {
    const tr = document.createElement('tr');
    if (state.selectedOngoingOrder && state.selectedOngoingOrder.orderId === order.orderId) {
      tr.className = 'selected-row';
    }

    tr.innerHTML = `
      <td>${order.orderId}</td>
      <td>${order.siteName}</td>
      <td>${formatDateString(order.createdDate)}</td>
      <td>${formatDateString(order.requestedDelivery)}</td>
      <td>${order.requestedBy}</td>
      <td><span class="status-badge ${order.orderStatus}">${order.orderStatus}</span></td>
      <td>£${order.totalValue.toFixed(2)}</td>
      <td class="center-text">${order.standingOrder ? '<span class="standing-order-check">&#10004;</span>' : ''}</td>
    `;

    tr.addEventListener('click', () => {
      const rows = tbody.querySelectorAll('tr');
      rows.forEach(r => r.classList.remove('selected-row'));
      tr.classList.add('selected-row');
      
      state.selectedOngoingOrder = order;
      loadOngoingOrderDetails(order);
    });

    tbody.appendChild(tr);
  });
}

function loadOngoingOrderDetails(order) {
  document.getElementById('detail-order-id').textContent = order.orderId;
  
  const statusBadge = document.getElementById('detail-delivery-status');
  statusBadge.className = `status-badge ${order.orderStatus}`;
  statusBadge.textContent = order.orderStatus;
  
  document.getElementById('detail-site-name').textContent = order.siteName;
  document.getElementById('detail-created').textContent = formatDateString(order.createdDate);
  document.getElementById('detail-created-by').textContent = order.requestedBy;
  document.getElementById('detail-last-updated').textContent = '';
  document.getElementById('detail-updated-by').textContent = '';

  const itemsTbody = document.getElementById('detail-items-tbody');
  itemsTbody.innerHTML = '';
  
  if (!order.items || order.items.length === 0) {
    itemsTbody.innerHTML = `<tr><td colspan="4" class="no-items">No product items listed</td></tr>`;
    return;
  }

  order.items.forEach(item => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${item.product}</td>
      <td>£${item.value.toFixed(2)}</td>
      <td>${item.quantity}</td>
      <td>£${item.total.toFixed(2)}</td>
    `;
    itemsTbody.appendChild(tr);
  });
}

function clearOngoingOrderDetails() {
  document.getElementById('detail-order-id').textContent = '-';
  const statusBadge = document.getElementById('detail-delivery-status');
  statusBadge.className = 'status-badge';
  statusBadge.textContent = '-';
  document.getElementById('detail-site-name').textContent = '-';
  document.getElementById('detail-created').textContent = '-';
  document.getElementById('detail-created-by').textContent = '-';
  document.getElementById('detail-last-updated').textContent = '-';
  document.getElementById('detail-updated-by').textContent = '-';

  const itemsTbody = document.getElementById('detail-items-tbody');
  itemsTbody.innerHTML = `<tr><td colspan="4" class="no-items">Select an order to view breakdown</td></tr>`;
}

function formatDateString(str) {
  if (!str) return '-';
  const parts = str.split(' ');
  const datePart = parts[0];
  const timePart = parts[1] || '';

  const dParts = datePart.split('-');
  if (dParts.length === 3) {
    return `${dParts[2]}/${dParts[1]}/${dParts[0]} ${timePart}`.trim();
  }
  return str;
}

// ==========================================
// 8. NEW ORDER BUILDER CONTROLLER (STEP 4)
// ==========================================
function setupNewOrderHandlers() {
  const productType = document.getElementById('product-type-select');
  const denomSelect = document.getElementById('denomination-select');
  const btnAddItem = document.getElementById('btn-add-item');
  const qtyInput = document.getElementById('product-quantity');

  productType.addEventListener('change', () => {
    updateDenominationDropdown(productType.value);
  });
  
  updateDenominationDropdown('coin');

  btnAddItem.addEventListener('click', () => {
    const type = productType.value;
    const denomIndex = denomSelect.value;
    const qty = parseInt(qtyInput.value);

    if (isNaN(qty) || qty <= 0) {
      showToast('Please enter a valid quantity.', 'error');
      return;
    }

    const productInfo = DATABASE.productDenominations[type][denomIndex];
    if (!productInfo) return;

    const existing = state.newOrderBreakdown.find(item => item.product === productInfo.name);
    if (existing) {
      existing.quantity += qty;
      existing.total = existing.quantity * existing.value;
    } else {
      state.newOrderBreakdown.push({
        product: productInfo.name,
        value: productInfo.unitValue,
        unitValue: productInfo.unitValue,
        quantity: qty,
        total: productInfo.unitValue * qty
      });
    }

    showToast(`Added ${qty}x ${productInfo.name} to order breakdown.`);
    updateBreakdownSummary();
    qtyInput.value = 1;
  });

  const selectAllChk = document.getElementById('select-all-breakdown');
  selectAllChk.addEventListener('change', () => {
    const chks = document.querySelectorAll('#breakdown-tbody input[type="checkbox"]');
    chks.forEach(chk => {
      chk.checked = selectAllChk.checked;
    });
  });

  document.getElementById('btn-clear-selected-breakdown').addEventListener('click', () => {
    const tbody = document.getElementById('breakdown-tbody');
    const chks = tbody.querySelectorAll('input[type="checkbox"]:checked');
    
    if (chks.length === 0) {
      showToast('No items checked for removal.', 'error');
      return;
    }

    const indexesToRemove = [];
    chks.forEach(chk => {
      indexesToRemove.push(parseInt(chk.getAttribute('data-index')));
    });

    indexesToRemove.sort((a,b) => b - a);
    indexesToRemove.forEach(idx => {
      state.newOrderBreakdown.splice(idx, 1);
    });

    selectAllChk.checked = false;
    showToast(`Removed selected items from breakdown.`);
    updateBreakdownSummary();
  });

  const excelInput = document.getElementById('excel-file-input');
  const excelPath = document.getElementById('excel-file-path');
  
  document.getElementById('btn-trigger-upload').addEventListener('click', () => {
    excelInput.click();
  });

  excelInput.addEventListener('change', (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      excelPath.value = file.name;
      
      showToast(`Spreadsheet Selected: "${file.name}"`);
      
      setTimeout(() => {
        mockExcelParse(file.name);
      }, 800);
    }
  });

  document.getElementById('btn-download-blank').addEventListener('click', (e) => {
    e.preventDefault();
    showToast('Downloading blank order spreadsheet template G4S_Order_Form.xlsx', 'warning');
    const dummyContent = 'G4S ORDER TEMPLATE FORMAT\nProduct Name,Quantity\nLoose Cash - 5,\n£1 - Sachet (£20),\n';
    triggerCsvDownload(dummyContent, 'G4S_Blank_Order_Form.csv');
  });

  document.getElementById('btn-clear-form').addEventListener('click', () => {
    const confirmClear = confirm('Are you sure you want to clear this order breakdown?');
    if (confirmClear) {
      state.newOrderBreakdown = [];
      updateBreakdownSummary();
      showToast('Breakdown cleared.', 'warning');
    }
  });

  // Form Submission
  document.getElementById('btn-submit-order').addEventListener('click', () => {
    const userVal = document.getElementById('order-user-select').value;
    if (!userVal) {
      showToast('Please select a User.', 'error');
      return;
    }

    if (state.newOrderBreakdown.length === 0) {
      showToast('Order breakdown is empty. Add products or upload an Excel sheet.', 'error');
      return;
    }

    const total = state.newOrderBreakdown.reduce((sum, item) => sum + item.total, 0);
    if (total > CREDIT_LIMIT) {
      showToast(`Submit failed. Order total (£${total.toFixed(2)}) exceeds weekly credit limit (£${CREDIT_LIMIT.toFixed(2)})`, 'error');
      return;
    }

    const newOrderId = String(Math.floor(6400000 + Math.random() * 300000));
    
    // Concat selected site names
    const joinedSiteNames = state.selectedSites.map(s => s.name).join(', ');

    const now = new Date();
    const formattedNow = now.toISOString().split('T')[0] + ' ' + 
      String(now.getHours()).padStart(2, '0') + ':' + 
      String(now.getMinutes()).padStart(2, '0') + ':' + 
      String(now.getSeconds()).padStart(2, '0');

    const newOrderObj = {
      orderId: newOrderId,
      customerKey: state.selectedCustomer,
      siteName: joinedSiteNames,
      createdDate: formattedNow,
      requestedDelivery: state.selectedDeliveryDate,
      requestedBy: userVal,
      orderStatus: 'notified',
      totalValue: total,
      standingOrder: false,
      items: [...state.newOrderBreakdown]
    };

    DATABASE.ongoingOrders.unshift(newOrderObj);
    
    showToast(`Order Placed Successfully! Generated Order ID: #${newOrderId}`, 'success');
    
    // Reset wizard back to step 1
    state.newOrderBreakdown = [];
    state.selectedSites = [];
    state.selectedDeliveryDate = '';
    const dateDisplay = document.getElementById('required-date-display');
    if (dateDisplay) dateDisplay.value = '';
    
    // Redirect to ongoing administration tab
    state.selectedOngoingOrder = newOrderObj;
    triggerTab('administration');
    loadOngoingOrderDetails(newOrderObj);
  });
}

function updateDenominationDropdown(type) {
  const select = document.getElementById('denomination-select');
  if (!select) return;
  
  select.innerHTML = '';
  const denoms = DATABASE.productDenominations[type];
  denoms.forEach((item, index) => {
    const opt = document.createElement('option');
    opt.value = index;
    opt.textContent = `${item.name} - Unit: £${item.unitValue.toFixed(2)}`;
    select.appendChild(opt);
  });
}

function updateBreakdownSummary() {
  const tbody = document.getElementById('breakdown-tbody');
  const totalValEl = document.getElementById('breakdown-total');
  const creditRemEl = document.getElementById('site-remaining-credit');

  if (!tbody) return;
  tbody.innerHTML = '';

  if (state.newOrderBreakdown.length === 0) {
    tbody.innerHTML = `<tr class="empty-breakdown-row"><td colspan="6" class="center-text">No items added to order</td></tr>`;
    totalValEl.textContent = '£0.00';
    creditRemEl.textContent = `£${CREDIT_LIMIT.toFixed(2)} (Weekly)`;
    creditRemEl.className = 'font-bold';
    return;
  }

  let grandTotal = 0;
  state.newOrderBreakdown.forEach((item, index) => {
    grandTotal += item.total;
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td class="checkbox-col"><input type="checkbox" data-index="${index}" aria-label="Item ${index}"></td>
      <td>${item.product}</td>
      <td>£${item.value.toFixed(2)}</td>
      <td>£${item.unitValue.toFixed(2)}</td>
      <td>${item.quantity}</td>
      <td>£${item.total.toFixed(2)}</td>
    `;
    tbody.appendChild(tr);
  });

  totalValEl.textContent = `£${grandTotal.toFixed(2)}`;
  
  const remaining = CREDIT_LIMIT - grandTotal;
  creditRemEl.textContent = `£${remaining.toFixed(2)} (Weekly)`;

  if (remaining < 0) {
    creditRemEl.className = 'font-bold text-danger';
  } else {
    creditRemEl.className = 'font-bold';
  }
}

function mockExcelParse(fileName) {
  showToast('Parsing Excel template format. Extracting denomination data...', 'warning');

  setTimeout(() => {
    state.newOrderBreakdown = [
      { product: "Loose Cash - 5", value: 5.00, unitValue: 5.00, quantity: 20, total: 100.00 },
      { product: "£1 - Sachet (£20)", value: 20.00, unitValue: 20.00, quantity: 5, total: 100.00 },
      { product: "50p - Sachet (£10)", value: 10.00, unitValue: 10.00, quantity: 5, total: 50.00 }
    ];
    updateBreakdownSummary();
    showToast(`Successfully imported 3 items from "${fileName}". Total Order: £250.00`, 'success');
  }, 1000);
}


// ==========================================
// 9. ORDER HISTORY CONTROLLER
// ==========================================
function setupHistoryFiltersHandlers() {
  const btnSearchId = document.getElementById('btn-history-search-id');
  const btnClearFilters = document.getElementById('btn-clear-history-filters');

  btnSearchId.addEventListener('click', () => {
    state.historyFilters.orderId = document.getElementById('history-filter-order-id').value.trim();
    state.historyPage = 1;
    renderHistoryOrdersTable();
  });

  const termInput = document.getElementById('history-filter-term');
  termInput.addEventListener('input', (e) => {
    state.historyFilters.term = e.target.value.toLowerCase();
    state.historyFilters.siteBy = document.getElementById('history-filter-site-by').value;
    state.historyPage = 1;
    renderHistoryOrdersTable();
  });

  document.getElementById('history-filter-from').addEventListener('change', (e) => {
    state.historyFilters.from = e.target.value;
    state.historyPage = 1;
    renderHistoryOrdersTable();
  });

  document.getElementById('history-filter-to').addEventListener('change', (e) => {
    state.historyFilters.to = e.target.value;
    state.historyPage = 1;
    renderHistoryOrdersTable();
  });

  btnClearFilters.addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('history-filter-order-id').value = '';
    document.getElementById('history-filter-term').value = '';
    document.getElementById('history-filter-from').value = '';
    document.getElementById('history-filter-to').value = '';
    document.getElementById('history-filter-site-by').selectedIndex = 0;

    state.historyFilters = {
      orderId: '',
      siteBy: 'id',
      term: '',
      from: '',
      to: ''
    };

    state.historyPage = 1;
    renderHistoryOrdersTable();
    showToast('History filters cleared.', 'warning');
  });

  const headers = document.querySelectorAll('#history-orders-table th.sortable');
  headers.forEach(header => {
    header.addEventListener('click', () => {
      const colKey = header.getAttribute('data-sort');
      if (state.historySort.column === colKey) {
        state.historySort.direction = state.historySort.direction === 'asc' ? 'desc' : 'asc';
      } else {
        state.historySort.column = colKey;
        state.historySort.direction = 'asc';
      }
      
      headers.forEach(h => {
        const icon = h.querySelector('.sort-icon');
        if (h.getAttribute('data-sort') === colKey) {
          icon.innerHTML = state.historySort.direction === 'asc' ? '&#9652;' : '&#9662;';
        } else {
          icon.innerHTML = '&#9662;';
        }
      });

      renderHistoryOrdersTable();
    });
  });

  // Reuse history order
  document.getElementById('btn-reuse-order').addEventListener('click', () => {
    if (!state.selectedHistoryOrder) {
      showToast('Please select a history order to reuse.', 'error');
      return;
    }
    
    state.newOrderBreakdown = state.selectedHistoryOrder.items.map(item => ({
      product: item.product,
      value: item.value,
      unitValue: item.value,
      quantity: item.quantity,
      total: item.total
    }));

    const siteObj = DATABASE.customers[state.selectedCustomer].sites.find(s => state.selectedHistoryOrder.siteName.includes(s.name) || state.selectedHistoryOrder.siteName.includes(s.id));
    if (siteObj) {
      state.selectedSites = [{ id: siteObj.id, name: siteObj.name }];
    } else {
      state.selectedSites = [{ id: "TEMP", name: state.selectedHistoryOrder.siteName }];
    }

    state.selectedDeliveryDate = state.selectedHistoryOrder.requestedDelivery;
    state.isAdditionalService = false; 

    showToast(`Loaded items from History Order #${state.selectedHistoryOrder.orderId} directly into final denomination panel.`, 'success');
    
    triggerTab('new-order');
    setWizardStep(4);
    updateBreakdownSummary();
  });

  document.getElementById('btn-export-report-submit').addEventListener('click', () => {
    const reportType = document.getElementById('history-report-type').value;
    const fileType = document.querySelector('input[name="report-file-type"]:checked').value;
    
    showToast(`Generating ${reportType.toUpperCase()} report in ${fileType.toUpperCase()} format...`, 'warning');
    
    setTimeout(() => {
      const dummyReport = `REPORT TYPE: ${reportType.toUpperCase()}\nOrder ID,Site ID,Total Value\n12345,NEWCA001,4000.00\n`;
      triggerCsvDownload(dummyReport, `G4S_${reportType}_Report.${fileType === 'excel' ? 'csv' : 'pdf'}`);
      showToast('Report downloaded successfully.');
    }, 1200);
  });
}

function getFilteredHistoryOrders() {
  let list = [...DATABASE.historyOrders];

  if (state.selectedCustomer) {
    list = list.filter(o => o.customerKey === state.selectedCustomer);
  }

  if (state.historyFilters.orderId) {
    list = list.filter(o => o.orderId.toLowerCase().includes(state.historyFilters.orderId.toLowerCase()));
  }

  if (state.historyFilters.term) {
    const term = state.historyFilters.term;
    list = list.filter(o => o.siteName.toLowerCase().includes(term));
  }

  if (state.historyFilters.from) {
    const fromDate = new Date(state.historyFilters.from);
    list = list.filter(o => new Date(o.createdDate) >= fromDate);
  }

  if (state.historyFilters.to) {
    const toDate = new Date(state.historyFilters.to);
    list = list.filter(o => new Date(o.createdDate) <= toDate);
  }

  const col = state.historySort.column;
  const dir = state.historySort.direction;
  list.sort((a, b) => {
    let valA = a[col];
    let valB = b[col];

    if (col === 'totalValue') {
      valA = Number(valA);
      valB = Number(valB);
    } else {
      valA = String(valA).toLowerCase();
      valB = String(valB).toLowerCase();
    }

    if (valA < valB) return dir === 'asc' ? -1 : 1;
    if (valA > valB) return dir === 'asc' ? 1 : -1;
    return 0;
  });

  return list;
}

function renderHistoryOrdersTable() {
  const tbody = document.getElementById('history-orders-tbody');
  const pagination = document.getElementById('history-pagination');
  if (!tbody || !pagination) return;

  tbody.innerHTML = '';
  pagination.innerHTML = '';

  const list = getFilteredHistoryOrders();

  if (list.length === 0) {
    tbody.innerHTML = `<tr><td colspan="8" class="center-text">No order history records found</td></tr>`;
    return;
  }

  const totalRows = list.length;
  const totalPages = Math.ceil(totalRows / state.historyRowsPerPage);
  
  if (state.historyPage > totalPages) state.historyPage = totalPages || 1;
  const startIndex = (state.historyPage - 1) * state.historyRowsPerPage;
  const endIndex = Math.min(startIndex + state.historyRowsPerPage, totalRows);

  const paginatedList = list.slice(startIndex, endIndex);

  paginatedList.forEach(order => {
    const tr = document.createElement('tr');
    if (state.selectedHistoryOrder && state.selectedHistoryOrder.orderId === order.orderId) {
      tr.className = 'selected-row';
    }

    tr.innerHTML = `
      <td>${order.orderId}</td>
      <td>${order.customerName}</td>
      <td>${order.siteName}</td>
      <td>${formatDateString(order.requestedDelivery)}</td>
      <td>${formatDateString(order.createdDate)}</td>
      <td><span class="status-badge ${order.orderStatus.toLowerCase()}">${order.orderStatus}</span></td>
      <td>£${order.totalValue.toFixed(2)}</td>
      <td class="checkbox-col" onclick="event.stopPropagation();"><input type="checkbox" class="reuse-checkbox"></td>
    `;

    tr.addEventListener('click', () => {
      const rows = tbody.querySelectorAll('tr');
      rows.forEach(r => r.classList.remove('selected-row'));
      tr.classList.add('selected-row');

      state.selectedHistoryOrder = order;
      loadHistoryOrderDetails(order);
    });

    tbody.appendChild(tr);
  });

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement('button');
    btn.className = `pagination-btn ${i === state.historyPage ? 'active' : ''}`;
    btn.textContent = i;
    btn.addEventListener('click', () => {
      state.historyPage = i;
      renderHistoryOrdersTable();
    });
    pagination.appendChild(btn);
  }
}

function loadHistoryOrderDetails(order) {
  document.getElementById('history-detail-total').textContent = `£${order.totalValue.toFixed(2)}`;
  
  const remaining = CREDIT_LIMIT - order.totalValue;
  document.getElementById('history-detail-remaining').textContent = `£${remaining.toFixed(2)} (Weekly)`;

  const itemsTbody = document.getElementById('history-detail-items-tbody');
  itemsTbody.innerHTML = '';

  order.items.forEach(item => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${item.product}</td>
      <td>£${item.total.toFixed(2)}</td>
      <td>£${item.value.toFixed(2)}</td>
      <td>${item.quantity}</td>
      <td>£${item.total.toFixed(2)}</td>
    `;
    itemsTbody.appendChild(tr);
  });
}

// ==========================================
// 10. GENERAL EXPORT & FILE DOWNLOAD
// ==========================================
function triggerCsvDownload(csvString, fileName) {
  const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  
  link.setAttribute("href", url);
  link.setAttribute("download", fileName);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
