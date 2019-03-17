import json
import numpy as np
import os
import pandas as pd
import pickle
import xgboost as xgb
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split
CATEGORICAL_COLUMNS = (
    'CHARSET',
    'SERVER',
    'WHOIS_COUNTRY',
    'WHOIS_STATEPRO',
    'WHOIS_REGDATE',
    'WHOIS_UPDATED_DATE',
)

data = pd.read_csv("C:\\users\\jaeso\\Documents\\eth0s\\processed_data.csv")
input = data.drop('Type',axis=1)
output = data['Type']
train_input, test_input, train_output, test_output = train_test_split(input, output, test_size = 0.33,random_state = 10)

encoders = {col:LabelEncoder() for col in CATEGORICAL_COLUMNS}
for col in CATEGORICAL_COLUMNS:
    train_input[col] = encoders[col].fit_transform(train_input[col])
for col in CATEGORICAL_COLUMNS:
    test_input[col] = encoders[col].fit_transform(test_input[col])

dtrain = xgb.DMatrix(train_input,train_output)
dtest = xgb.DMatrix(test_input)

bst = xgb.train({}, dtrain, 20)
bst.save_model('./model.bst')
