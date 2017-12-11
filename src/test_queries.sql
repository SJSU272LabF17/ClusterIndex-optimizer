1.
select user.first_name, user.last_name, user.company, user.country_code, country.country from user, country where user.country_code = country.country_code order by user.user_id;

2.
select user.first_name, user.last_name, user.company, stock.stock_sector, stock.stock_symbol, stock.stock_market_cap from user, stock where user.company = stock.company and stock.stock_sector in ('Technology', 'Finance');

3.
select country.country, user.gender, count(*) from user, country where user.country_code = country.country_code group by country.country, user.gender order by user.country_code;

4.
select user.first_name, user.last_name, user.company, company.street_number, company.street_name, company.city, company.state, company.country from user, company where user.company = company.company order by user.user_id;

5.
select user.user_id, user.first_name, user.last_name, user.addressId, address.street_name, address.city, address.state from user, address where user.addressId = address.addressId order by user.user_id;

/*Set index user_id, country_code*/
ALTER TABLE `user_with_index`.`user` 
ADD INDEX `index_1` (`user_id` ASC),
ADD INDEX `index_2` (`country_code` ASC);

/*Set index user_id, country_code, company*/
ALTER TABLE `user_with_index`.`user` 
ADD INDEX `index_1` (`user_id` ASC),
ADD INDEX `index_2` (`country_code` ASC),
ADD INDEX `index_3` (`company` ASC);

/*Set joining tables indexes: addressId, company, country, stock_id*/
ALTER TABLE `user_with_index`.`address` 
ADD INDEX `index_addId_1` (`addressId` ASC);

ALTER TABLE `user_with_index`.`company` 
ADD INDEX `index_comp_1` (`company` ASC);

ALTER TABLE `user_with_index`.`country` 
ADD INDEX `index_countryId_1` (`country_code` ASC);

ALTER TABLE `user_with_index`.`stock` 
ADD INDEX `index_stockId_1` (`stock_id` ASC);
