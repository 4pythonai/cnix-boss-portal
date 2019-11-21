# cnix-boss
React-Boss-Portal,弃用ExtJs.


### docker

apache2-php7

### 服务器文件
/home/webapps/cnix-boss-portal


### 端口
portal:8503
api:8502

### Git地址

https://github.com/tangyongjin/cnix-boss-portal

https://github.com/tangyongjin/cnix-boss-portal-api



### 数据库结构

 ALTER TABLE boss_contract_resource_item MODIFY id int(11) AUTO_INCREMENT PRIMARY KEY


### 用户-合同-费用条目-资源占用-产品

用户-合同,1对多.
合同-费用条目,1对多.
费用条目-产品,1对1
费用条目-资源占用,1对多
资源占用数据由钉钉流程产生.同时设置网络资源状态.
资源占用数据是计费的基础(时间线)
费用条目(设定某个用户下面某个合同某个产品的价格)


### 计费逻辑

#### 开通流程永远是insert一条记录 
#### 关闭流程永远是update一条记录 
