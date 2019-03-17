import numpy as py
import pandas as pd
import xgboost as xgb
import pickle as pkl

from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
from sklearn.preprocessing import LabelEncoder

dataset = pd.read_csv("C:\\users\\jaeso\\Documents\\eth0s\\processed_data.csv")
dataset = dataset.select_dtypes(['number'])
input = dataset.drop(["Type"],axis=1,inplace=True)
#input.to_csv("inputs_xgb.csv",index=False)
output = dataset['Type']
train_input, test_input, train_output, test_output = train_test_split(input, output, test_size = 0.33,random_state = 10)
clf = xgb.XGBClassifier(eta = 0.1,max_depth = 3, min_child_weight=1)
clf.fit(train_input, train_output)
print(clf)
prediction = clf.predict(test_input)
print(accuracy_score(test_output,prediction))
print(clf.score(train_input, train_output))
with open('model.pkl','wb') as model_file:
    pkl.dump(clf,model_file)
