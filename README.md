# cnix-boss


### docker

apache2-php7

### 服务器文件
/home/webapps/cnix-boss-portal


### 端口
portal:8503
api:8502


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
#### 

检查合同号:(一次性费用从资源占用里面移除.)
#### 
XS2018031
#### 
XS2018031
#### 
XS2018031
#### 
XS2018031
#### 
XS2018031
#### 
XS2018031
#### 
XS2019015
#### 
XS2019027
#### 
XS2018059
#### 
XS2019007
