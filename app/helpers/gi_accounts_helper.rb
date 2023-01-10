module GiAccountsHelper
   def render_list_char(list_char)
    list_char = list_char.tr('[]', '').split(',').map(&:to_i) 
     list_char_new = Charater.where(id: list_char).pluck(:name)
     list_char_new.join(", ")
    end

    def render_list_weap(list_weap)
        list_weap = list_weap.tr('[]', '').split(',').map(&:to_i) 
        list_weap_new = Weapon.where(id: list_weap).pluck(:name)
        list_weap_new.join(", ")
    end
end
