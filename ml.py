import numpy as np
import pandas as pd

from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split

data = pd.read_csv("C:\\Users\\jaeso\\Documents\\eth0s\\interpolated_dataset.csv")
data = pd.get_dummies(data, prefix_sep='--')
