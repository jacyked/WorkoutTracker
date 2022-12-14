import json

f = open('E:\Projects\WorkoutTracker\exercisedb\exercisedb_raw.json', encoding='utf8')

olddata = json.load(f)
newdata = {"exercise": []}

for i in olddata['exercise']:
    try:
        id = i["id"]
    except:
        id =""
    try:
        stringName = i["slug"]
    except:
        stringName = ""
    try:
        fullName= i["name"]
    except:
        fullName= ""
    try:
        aka = i["alsoKnownAs"]
    except:
        aka=""
    try:
        rating = i["rating"]
    except:
        rating=""
    try:
        relatedExercises = i["relatedExercises"]
    except:
        relatedExercises=""
    try:
        isActive = i["active"]
    except:
        isActive=""
    try:
        benefits = i["benefits"]
    except:
        benefits=""
    try:
        shortDesc = i["shortDescription"]
    except:
        shortDesc=""
    try:
        description = i["description"]
    except:
        description=""
    try:
        exerciseType = i["exerciseType"]
    except:
        exerciseType=""
    try:
        level = i["level"]
    except:
        level=""
    try:
        mainMuscle = i["mainMuscle"]
    except:
        mainMuscle=""
    try:
        mainMuscleName = i["mainMuscleName"]
    except:
        mainMuscleName=""
    try:
        otherMuscles = i["otherMuscles"]
    except:
        otherMuscles=""
    try:
        isSport = i["isSport"]
    except:
        isSport=""
    try:
        mechanicType = i["mechanicType"]
    except:
        mechanicType=""
    try:
        force = i["force"]
    except:
        force=""
    try:
        equipment = i["equipment"]
    except:
        equipment=""
    try:
        equipmentType = i["equipmentType"]
    except:
        equipmentType=""
    try:
        equipmentTypes = i["equipmentTypes"]
    except:
        equipmentTypes=""

    dictionary = {
        "id": id,
        "stringName": stringName,
        "fullName": fullName,
        "aka": aka,
        "rating": rating,
        "relatedExercises": relatedExercises,
        "isActive": isActive,
        "benefits": benefits,
        "shortDesc": shortDesc,
        "description": description,
        "exerciseType": exerciseType,
        "level": level,
        "mainMuscle": mainMuscle,
        "mainMuscleName": mainMuscleName,
        "otherMuscles": otherMuscles,
        "isSport": isSport,
        "mechanicType": mechanicType,
        "force": force,
        "equipment": equipment,
        "equipmentType": equipmentType,
        "equipmentTypes": equipmentTypes,
    }
    newdata["exercise"].append(dictionary)

n = open('E:\Projects\WorkoutTracker\exercisedb\exercisedb_processed.json', 'w')
print("Count: ", len(newdata["exercise"]))
json.dump(newdata, n)

f.close()
n.close()