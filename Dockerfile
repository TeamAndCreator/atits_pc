FROM  tomcat
MAINTAINER liulianjushi@126.com
ENV CATALINA_HOME /usr/local/tomcat
RUN mkdir /root/atits_pc
ADD  ./ /root/atits_pc
ADD ./server.xml $CATALINA_HOME/conf/server.xml
RUN rm /root/atits_pc/server.xml
WORKDIR $CATALINA_HOME
CMD ["catalina.sh", "run"]