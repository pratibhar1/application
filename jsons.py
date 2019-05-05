import json
j=[]
with open("datab1.json") as my_data_file:
    my_data = json.load(my_data_file)
print(my_data)
for i in my_data:
    j=i
    print({'page':j['page'],'count':j['count']})
    
