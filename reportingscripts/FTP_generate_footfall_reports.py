import json
import os
import sys
import requests
import csv
from datetime import datetime,timedelta
from dateutil.relativedelta import relativedelta
date=None
siteMap={'111':110005,'112':365002,'113':110001,'114':110002}
url = "http://localhost:9200/filebeat-*/_search/?size="
#url = "http://smargtech.in:36523/filebeat-*/_search/?size="
headers = {'content_type': 'application/json','Authorization':'Basic ZWxhc3RpYzpzbWFyZzEyM3NtYXJnIw=='}
def create_request_for_person_data(site_id, zone_ids, from_date, to_date):
    fff="{:02d}-{:02d}-{:02d}T".format(from_date.year, from_date.month, from_date.day)+"{:02d}:{:02d}:{:02d}.000Z".format(from_date.hour, from_date.minute,from_date.second)
    ttt="{:02d}-{:02d}-{:02d}T".format(to_date.year, to_date.month, to_date.day)+"{:02d}:{:02d}:{:02d}.999Z".format(to_date.hour, to_date.minute,to_date.second)
    json_obj = {
        "query": {"bool": {"must": [],"filter": [{"term": {"SiteId": site_id}},{"terms": {"ZoneId": zone_ids}},{"term": {"isViolation": 0}},{"term": {"Direction.keyword": "IN"}},{"term": {"NotificationType": "7"}},{"range": {"DateTime": {"gte": fff,"lte": ttt}}},{"term": {"OverAllCount.keyword": "Person"}}]}},
        "aggs": {"ZoneDetails_Hourly_Count": {"terms": {"field": "Zone.keyword"},"aggs": {"HoulyCount": {"date_histogram": {"field": "DateTime","interval": "hour","format": "H"}}}}}
        }
    return json_obj
def create_request_for_vehicle_data(site_id, from_date, to_date):
    fff="{:02d}-{:02d}-{:02d}T".format(from_date.year, from_date.month, from_date.day)+"{:02d}:{:02d}:{:02d}.000Z".format(from_date.hour, from_date.minute,from_date.second)
    ttt="{:02d}-{:02d}-{:02d}T".format(to_date.year, to_date.month, to_date.day)+"{:02d}:{:02d}:{:02d}.999Z".format(to_date.hour, to_date.minute,to_date.second)
    # json_obj = {
    #     "query": {"bool": {"must": [],"filter": [{"term": {"SiteId": site_id}},{"term": {"MainEntryCount": 1}},{"term": {"OwnerType": 3}},{"term": {"Direction.keyword": "IN"}},{"term": {"NotificationType": "12"}},{"range": {"DateTime": {"gte": fff,"lte": ttt}}}]}},
    #     "aggs": {"ZoneDetails_Hourly_Count": {"terms": {"field": "Zone.keyword"},"aggs": {"HoulyCount": {"date_histogram": {"field": "DateTime","interval": "hour","format": "H"}}}}}
    #     }
    json_obj = {
        "query": {"bool": {"must": [],"filter": [{"term": {"SiteId": site_id}},{"term": {"MainEntryCount": 1}},{"term": {"OwnerType": 3}},{"term": {"Direction.keyword": "IN"}},{"term": {"NotificationType": "12"}},{"range": {"DateTime": {"gte": fff,"lte": ttt}}}]}},
        "aggs": {"HoulyCount": {"date_histogram": {"field": "DateTime","interval": "hour","format": "H"}}}
        }
    return json_obj
        
if __name__=='__main__':
    if sys.argv[1] is not None:
        data=json.loads(str(sys.argv[1]))
        site_id = data["site_id"]
        site_name = data["site_name"]
        f_date= datetime. strptime(data["from_date"], '%Y-%m-%d %H:%M:%S')
        t_date = datetime.strptime(data["to_date"], '%Y-%m-%d %H:%M:%S')
        f = f_date
        t=t_date
        zones = data["zones"]
 
        if f_date is not None:
            zonesId = [o["id"] for o in zones]
            footfall_payload = create_request_for_person_data(site_id, zonesId, f_date, t_date)
            response = requests.get(url+"0",json=footfall_payload,headers=headers,timeout=(300,300))
            footfall_result=response.json()
            ZoneDetails_Hourly_Count=footfall_result["aggregations"]["ZoneDetails_Hourly_Count"]["buckets"]
            row_num=2
            fileName="./report/FF_"+str(siteMap[site_id])+"_"+str(f.strftime("%d%m%Y"))+".csv"
            with open(fileName, 'w') as csvfile: 
                csvwriter = csv.writer(csvfile) 
                csvwriter.writerow(["Entrance","From","To","FFCount"])   
                for ZonesData in ZoneDetails_Hourly_Count:
                    entranceName=ZonesData["key"]
                    entry_wise_hr_data=ZonesData['HoulyCount']['buckets']
                    
                    for each_hour_data in entry_wise_hr_data:
                        hr_from_time=each_hour_data["key_as_string"]
                        footfallCount=each_hour_data["doc_count"]
                        hr_to_time=int(hr_from_time)+1
                        if int(hr_from_time)==23:
                            hr_to_time="0"
                        csvwriter.writerow([entranceName,hr_from_time,str(hr_to_time),footfallCount])   
            ##report for Vehicle 
            vehicle_payload = create_request_for_vehicle_data(site_id, f_date, t_date)
            vehicle_response = requests.get(url+"0",json=vehicle_payload,headers=headers,timeout=(300,300))
            vehicle_result=vehicle_response.json()
            HoulyCount=vehicle_result["aggregations"]["HoulyCount"]["buckets"]
            row_num=2
            vehicleFileName="./report/CAR_"+str(siteMap[site_id])+"_"+str(f.strftime("%d%m%Y"))+".csv"
            with open(vehicleFileName, 'w') as csvfile_1: 
                csvwriter = csv.writer(csvfile_1) 
                csvwriter.writerow(["From","To","CarCount"])   
                # for ZonesData_v in ZoneDetails_Hourly_Count_Vehicle:
                #     entranceName_v=ZonesData_v["key"]
                #     entry_wise_hr_data_v=ZonesData_v['HoulyCount']['buckets']
                    
                for each_hour_data_v in HoulyCount:
                    hr_from_time_v=each_hour_data_v["key_as_string"]
                    vehicleCount=each_hour_data_v["doc_count"]
                    hr_to_time_v=int(hr_from_time_v)+1
                    if int(hr_from_time_v)==23:
                        hr_to_time_v="0"
                    csvwriter.writerow([hr_from_time_v,str(hr_to_time_v),vehicleCount])   
        
        # print('Report Generate Successfully ::FF_{}_{}.csv'.format(site_id,f.strftime("%d%m%Y")))
        
        print(fileName+"::::"+vehicleFileName)
    else:
        print("Please pass the site id,site_name, zones, from date(YYYY-mm-dd HH:MM:ss) and to date(YYYY-mm-dd HH:MM:ss) for which reports needed.")
    
        
