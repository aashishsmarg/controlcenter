import { router } from '../utils/imports.js';  
import testSentMail from '../tests/testMail.js'

import login from '../controller/login.controller.js'
import dashboard from '../controller/dashboard.controller.js'
import overview from '../controller/overview.controller.js'
import footfallTrend from '../controller/footfalltrend.controller.js'
import footfalldistribution from '../controller/footfalldistribution.controller.js'

import traction_analysis from '../controller/event.traction.analysis.controller.js'
import addashboard from '../controller/advertisment.dashboard.controller.js'
import screen_trends from '../controller/screen.trends.controller.js'
import offeranalytics from '../controller/offer.trends.controller.js'
import violation_analytics from '../controller/violationanalytics.controller.js'
import violations from '../controller/violations.list.controller.js'
import queueanalytics from '../controller/queue.analytics.controller.js'
import vehicle_analytics from '../controller/vehicleanalytics.controller.js'
import vehiclelistanpr from '../controller/parked.vehicle.list.controller.js'// parked vehicles
import monitoring from '../controller/monitoring.controller.js'
import support from '../controller/support.controller.js'
// import parkingAvailability from '../controller/advanceparking/parking.availability.controller.js'
// import  SmartParking from '../controller/advanceparking/advance.parking.booking.controller.js'
// import advance_parking_booking_search from '../controller/advanceparking/advance.parking.booking.search.controller.js'
router.get('/',login)
router.get('/logout',login)
router.get('/dashboard',dashboard)
router.get('/overview',overview)
router.get('/footfalltrend',footfallTrend)
router.get('/footfalldistribution',footfalldistribution)
router.get('/tractionanalysis',traction_analysis)
router.get('/addashboard',addashboard)
router.get('/screentrends',screen_trends)

router.get('/offeranalytics',offeranalytics)
router.get('/violationtrend',violation_analytics) // Violation Trends
router.get('/violations', violations)
router.get('/queueanalytics',queueanalytics)
router.get('/vehicleanalytics',vehicle_analytics) // Vehicle Trends

router.get('/vehiclelistanpr' , vehiclelistanpr )
router.get('/monitoring' , monitoring ) 
router.get('/support',support)
// router.get('/parkingavailability' , parkingAvailability )
// router.get('/SmartParking' , SmartParking )
// router.get('/SmartParking/AdvanceBooking', SmartParking);
// router.post('/SmartParking/parking' , SmartParking )
// router.get('/SmartParking/AdvanceBookingSearch', advance_parking_booking_search);
// router.get('/SmartParking/AdvanceBookingSearch/(:parking_name)/(:available_space)', advance_parking_booking_search);
// router.get('/SmartParking/AdvanceBookingSearch', advance_parking_booking_search);

router.get('/testmail' , testSentMail ) //testing purpose
export default router