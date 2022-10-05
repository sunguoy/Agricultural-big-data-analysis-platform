import os
import pymysql
pymysql.install_as_MySQLdb()
print(os.path.join(os.path.dirname(__file__),"data.csv"))
